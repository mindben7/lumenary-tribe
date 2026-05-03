import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

// 1. Unified Zod Schema for Structured Output across all models
export const chronosExtractionSchema = z.object({
  events: z.array(z.object({
    label: z.string().describe("Short, clear title of the event."),
    lane_id: z.string().describe("Category/Lane (e.g., 'brickell', 'marketing')."),
    start_date: z.string().describe("ISO-8601 start date."),
    end_date: z.string().optional().describe("ISO-8601 end date. Omit if it's a single milestone."),
    type: z.enum(["milestone", "task", "phase"]),
    description: z.string().optional().describe("Brief details or context."),
    relationships: z.array(z.object({
      target_label: z.string(),
      type: z.enum(["causes", "depends-on", "related-to"])
    })).optional(),
    confidence: z.number().describe("0-100 score indicating certainty of the date and extraction.")
  }))
});

// 2. Multi-Model Waterfall Routing (For Production Uptime & Limits)
// Cycles through preferred models automatically if one fails.
const preferredModelWaterfall = [
  { name: 'claude-3-5-sonnet', model: anthropic('claude-3-5-sonnet-20240620') },
  { name: 'gpt-4o', model: openai('gpt-4o') },
  { name: 'gemini-1.5-pro', model: google('gemini-1.5-pro-latest') }
];

export async function extractTimelineWithFallback(prompt: string) {
  let lastError = null;

  for (const { name, model } of preferredModelWaterfall) {
    try {
      console.log(`[Multi-Model Router] Attempting generation with ${name}...`);
      const { object } = await generateObject({
        model,
        prompt,
        schema: chronosExtractionSchema,
      });
      
      console.log(`[Multi-Model Router] Success using ${name}`);
      return { provider: name, data: object };
    } catch (error) {
      console.warn(`[Multi-Model Router] Model ${name} failed:`, error);
      lastError = error;
      // Loop continues to next model fallback
    }
  }

  throw new Error(`All fallback models failed. Last error: ${lastError}`);
}

// 3. Multi-Model Arena Comparison (For testing & prompt engineering)
// Runs all models concurrently and returns them side-by-side.
export async function compareModelsConcurrently(prompt: string) {
  const promises = preferredModelWaterfall.map(async ({ name, model }) => {
    try {
      const { object } = await generateObject({
        model,
        prompt,
        schema: chronosExtractionSchema,
      });
      return { name, status: 'success', data: object };
    } catch (error) {
      return { name, status: 'error', error: String(error) };
    }
  });

  return await Promise.all(promises);
}

// 4. Shared Prompt Template
export const generateExtractionPrompt = (documentContent: string, anchorDate: string) => `
You are a strategic project analyst. Your task is to extract every dated event, milestone, or phase from the provided document to build an interactive timeline.

1.  **Resolve Relative Dates:** Use the provided Anchor Date (${anchorDate}) to resolve relative terms (e.g., "Month 3", "next quarter").
2.  **Identify Relationships:** Determine how events connect. If event A must happen before B, mark it as 'depends-on'. If A triggers B, mark it as 'causes'.
3.  **Categorize Lanes:** Group events into logical 'lanes' (e.g., by chapter like 'brickell', 'coral-gables', or by function).
4.  **Confidence:** Assign a confidence score (1-100). Lower scores indicate vague dates or ambiguous relationships.

Analyze the following document and output the structured data.

<document>
${documentContent}
</document>
`;