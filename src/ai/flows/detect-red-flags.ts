
'use server';

/**
 * @fileOverview Identifies potential red flags in a dating profile picture.
 *
 * - detectRedFlags - A function that detects red flags in a profile picture.
 * - DetectRedFlagsInput - The input type for the detectRedFlags function.
 * - DetectRedFlagsOutput - The return type for the detectRedFlags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectRedFlagsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a dating profile, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  profileDescription: z
    .string()
    .optional()
    .describe('Optional description of the profile.'),
});
export type DetectRedFlagsInput = z.infer<typeof DetectRedFlagsInputSchema>;

const DetectRedFlagsOutputSchema = z.object({
  redFlags: z
    .array(z.string())
    .describe('List of potential red flags identified in the profile picture.'),
  confidenceScores: z
    .record(z.number())
    .describe('Confidence scores for each red flag detected.'),
  summary: z.string().describe('A summary of the red flags detected.'),
});
export type DetectRedFlagsOutput = z.infer<typeof DetectRedFlagsOutputSchema>;

export async function detectRedFlags(input: DetectRedFlagsInput): Promise<DetectRedFlagsOutput> {
  return detectRedFlagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectRedFlagsPrompt',
  input: {schema: DetectRedFlagsInputSchema},
  output: {schema: DetectRedFlagsOutputSchema},
  prompt: `You are an AI dating profile assistant, skilled at identifying potential red flags in dating profiles.

  Analyze the provided profile picture and description (if available) to identify any potential red flags that might deter potential matches. Consider factors like image quality, composition, clothing, accessories, background, and overall presentation.

  Description: {{{profileDescription}}}
  Photo: {{media url=photoDataUri}}

  Based on your analysis, generate a list of red flags, confidence scores for each red flag, and a summary of your findings. Focus on objective observations and avoid making subjective judgments or assumptions about the person's character.

  {{output}}
  `,
});

const detectRedFlagsFlow = ai.defineFlow(
  {
    name: 'detectRedFlagsFlow',
    inputSchema: DetectRedFlagsInputSchema,
    outputSchema: DetectRedFlagsOutputSchema,
  },
  async input => {
    const result = await prompt(input);
    const output = result.output;

    if (!output) {
      console.error("DetectRedFlagsFlow: AI model did not return a valid output.", {
        candidates: result.candidates?.length,
        usage: result.usage,
        error: result.error, // Log any error reported in the result
      });
      throw new Error('AI model failed to generate a valid Red Flags response. The content might have been blocked or an internal error occurred.');
    }
    return output;
  }
);
