'use server';

import { geminiClient, CHRONOS_EXTRACTION_SCHEMA, generateExtractionPrompt } from '@lumenary/ai';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function ingestTimelineData(filePath: string, timelineId: string, anchorDate: Date) {
  try {
    // 1. Read the file
    const absolutePath = join(process.cwd(), '../..', filePath);
    const content = readFileSync(absolutePath, 'utf-8');

    // 2. Call Gemini
    const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: generateExtractionPrompt(content, anchorDate.toISOString()),
        config: {
            responseMimeType: "application/json",
            responseSchema: CHRONOS_EXTRACTION_SCHEMA,
        }
    });

    if (!response.text) {
        throw new Error("Gemini returned an empty response.");
    }

    const extractionResult = JSON.parse(response.text);
    
    // 4. Save to DB (Simplified for MVP: Inserts new events. Real implementation would reconcile diffs)
    // For now, we return the parsed events to update the client store directly to avoid DB dependency right now for demo
    
    console.log("Extraction successful:", extractionResult.events.length, "events found.");
    return { success: true, events: extractionResult.events };

  } catch (error) {
    console.error("Ingestion failed:", error);
    return { success: false, error: String(error) };
  }
}
