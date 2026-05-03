'use server';

import { extractTimelineWithFallback, generateExtractionPrompt } from '@lumenary/ai';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function ingestTimelineData(filePath: string, timelineId: string, anchorDate: Date) {
  try {
    // 1. Read the file
    const absolutePath = join(process.cwd(), '../..', filePath);
    const content = readFileSync(absolutePath, 'utf-8');

    // 2. Build the prompt
    const prompt = generateExtractionPrompt(content, anchorDate.toISOString());

    // 3. Call the Multi-Model Router
    const result = await extractTimelineWithFallback(prompt);

    // 4. Save to DB (Simplified for MVP: Inserts new events. Real implementation would reconcile diffs)
    // For now, we return the parsed events to update the client store directly to avoid DB dependency right now for demo
    
    console.log(`Extraction successful via ${result.provider}:`, result.data.events.length, "events found.");
    return { success: true, events: result.data.events, provider: result.provider };

  } catch (error) {
    console.error("Ingestion failed:", error);
    return { success: false, error: String(error) };
  }
}