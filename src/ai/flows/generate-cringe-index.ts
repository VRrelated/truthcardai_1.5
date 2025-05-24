// src/ai/flows/generate-cringe-index.ts
'use server';
/**
 * @fileOverview Generates a 'Cringe Index' score for a dating profile based on image and user input.
 *
 * - generateCringeIndex - A function that generates the cringe index.
 * - GenerateCringeIndexInput - The input type for the generateCringeIndex function.
 * - GenerateCringeIndexOutput - The return type for the generateCringeIndex function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCringeIndexInputSchema = z.object({
  profilePictureDataUri: z
    .string()
    .describe(
      "A profile picture, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userInput: z.string().describe('Additional user input about the profile.'),
});
export type GenerateCringeIndexInput = z.infer<typeof GenerateCringeIndexInputSchema>;

const GenerateCringeIndexOutputSchema = z.object({
  cringeIndex: z
    .number()
    .min(0)
    .max(100)
    .describe('The cringe index score, from 0 to 100.'),
  redFlags: z.array(z.string()).describe('List of red flags identified in the profile.'),
  explanation: z.string().describe('Explanation of why the profile received this score.'),
});
export type GenerateCringeIndexOutput = z.infer<typeof GenerateCringeIndexOutputSchema>;

export async function generateCringeIndex(input: GenerateCringeIndexInput): Promise<GenerateCringeIndexOutput> {
  return generateCringeIndexFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCringeIndexPrompt',
  input: {schema: GenerateCringeIndexInputSchema},
  output: {schema: GenerateCringeIndexOutputSchema},
  prompt: `You are a dating profile expert. Analyze the provided profile picture and user input to determine a 'Cringe Index' score (0-100) and identify any red flags.

Consider factors like photo quality, content, and overall presentation.

Profile Picture: {{media url=profilePictureDataUri}}
User Input: {{{userInput}}}

Assign a cringe index score and provide a list of specific red flags, along with a detailed explanation for the assigned score.
`,
});

const generateCringeIndexFlow = ai.defineFlow(
  {
    name: 'generateCringeIndexFlow',
    inputSchema: GenerateCringeIndexInputSchema,
    outputSchema: GenerateCringeIndexOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
