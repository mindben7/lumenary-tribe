import { GoogleGenAI, Type, Schema } from '@google/genai';

// Initialize the Gemini client. Expects GEMINI_API_KEY in the environment.
export const geminiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'dummy_key_for_build',
});

// We use Gemini's structured output schema feature
export const CHRONOS_EXTRACTION_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    events: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING, description: "Short, clear title of the event." },
          lane_id: { type: Type.STRING, description: "Category/Lane (e.g., 'brickell', 'marketing')." },
          start_date: { type: Type.STRING, description: "ISO-8601 start date." },
          end_date: { type: Type.STRING, description: "ISO-8601 end date. Omit if it's a single milestone." },
          type: { type: Type.STRING, enum: ["milestone", "task", "phase"] },
          description: { type: Type.STRING, description: "Brief details or context." },
          relationships: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                target_label: { type: Type.STRING, description: "Exact label of the related event." },
                type: { type: Type.STRING, enum: ["causes", "depends-on", "related-to"] }
              },
              required: ["target_label", "type"]
            }
          },
          confidence: { type: Type.INTEGER, description: "0-100 score indicating certainty of the date and extraction." }
        },
        required: ["label", "lane_id", "start_date", "type", "confidence"]
      }
    }
  },
  required: ["events"]
};

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
