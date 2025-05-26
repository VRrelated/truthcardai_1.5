
// src/ai/flows/generate-cringe-index.ts
'use server';
/**
 * @fileOverview Generates a 'Cringe Index' score for a dating profile based on image and user input.
 * This version uses pre-written roasts based on a simulated score.
 *
 * - generateCringeIndex - A function that generates the cringe index.
 * - GenerateCringeIndexInput - The input type for the generateCringeIndex function.
 * - GenerateCringeIndexOutput - The return type for the generateCringeIndex function.
 */

import {z} from 'genkit';
// Removed: import {ai} from '@/ai/genkit'; 

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
  redFlags: z.array(z.string()).describe('List of red flags (pre-written roast highlights) identified in the profile.'),
  explanation: z.string().describe('Explanation of why the profile received this score (based on pre-written categories).'),
});
export type GenerateCringeIndexOutput = z.infer<typeof GenerateCringeIndexOutputSchema>;

interface PredefinedRoastSet {
  redFlags: string[];
  explanation: string;
}

function getPredefinedRoasts(score: number): PredefinedRoastSet {
  if (score === 0) {
    return {
      redFlags: ["Zero cringe. You're officially unroastable.", "Is this a profile or a piece of art? No cringe here."],
      explanation: "This profile is impressively cringe-free. Well done!",
    };
  }
  if (score >= 1 && score <= 10) {
    return {
      redFlags: [
        "A faint whisper of awkwardness. Barely detectable.",
        "So subtle, the cringe almost slipped by unnoticed.",
        "You're flying low on the cringe radar.",
      ],
      explanation: "Very low cringe. Minor quirks at best, nothing to raise an alarm.",
    };
  }
  if (score >= 11 && score <= 20) {
    return {
      redFlags: [
        "A slight cringe aftertaste. Manageable.",
        "Spotted a little something... but we'll let it slide.",
        "Mildly amusing, not yet hazardous.",
      ],
      explanation: "Low cringe. A few things could be polished, but overall not too bad.",
    };
  }
  if (score >= 21 && score <= 30) {
    return {
      redFlags: [
        "The cringe is starting to make itself known.",
        "Definitely some questionable choices here.",
        "We're raising an eyebrow, but not the alarm bells. Yet.",
      ],
      explanation: "Noticeable cringe. Some elements are definitely raising eyebrows.",
    };
  }
  if (score >= 31 && score <= 40) {
    return {
      redFlags: [
        "Okay, now we're entering Cringetopia.",
        "This is where the 'oof' sounds begin.",
        "Some solid cringe material detected.",
      ],
      explanation: "Moderate cringe. You're providing some good material for a roast.",
    };
  }
  if (score >= 41 && score <= 50) {
    return {
      redFlags: [
        "Halfway to maximum cringe! Impressive, in a way.",
        "The cringe is strong with this one.",
        "Your choices are... bold. And cringey.",
      ],
      explanation: "Significant cringe. This profile has several key areas for roasting.",
    };
  }
  if (score >= 51 && score <= 60) {
    return {
      redFlags: [
        "Warning: High levels of secondhand embarrassment detected.",
        "This is not a drill. This is peak cringe content.",
        "Are you doing this on purpose? Because it's working.",
      ],
      explanation: "High cringe. We're starting to feel uncomfortable for you.",
    };
  }
  if (score >= 61 && score <= 70) {
    return {
      redFlags: [
        "The Cringe Index is screaming. Make it stop!",
        "Did you consult a manual on 'How to Be Cringe'?",
        "This profile is a masterclass in what not to do.",
      ],
      explanation: "Very high cringe. This profile is a goldmine of awkwardness.",
    };
  }
  if (score >= 71 && score <= 80) {
    return {
      redFlags: [
        "We need a moment. The cringe is overwhelming.",
        "This is avant-garde cringe. Truly groundbreaking.",
        "Your profile has ascended to legendary cringe status.",
      ],
      explanation: "Extremely high cringe. It's almost an art form at this point.",
    };
  }
  if (score >= 81 && score <= 90) {
    return {
      redFlags: [
        "Dangerously cringey. Approach with caution.",
        "This profile should be studied by cringeologists.",
        "You've unlocked a new level of cringe. Congratulations?",
      ],
      explanation: "Severe cringe. This profile is a monument to awkward decisions.",
    };
  }
  if (score >= 91 && score <= 100) {
    return {
      redFlags: [
        "Maximum Cringe Overload! System critical!",
        "This isn't just cringe, it's a lifestyle.",
        "You've won the Cringe Olympics. The medal is... this roast.",
      ],
      explanation: "Peak cringe. This profile is an epic saga of cringe, destined for the history books.",
    };
  }
  // Fallback, though with random 0-100 this shouldn't be hit.
  return {
    redFlags: ["Cringe-o-meter is confused. You're off the charts!"],
    explanation: "The cringe level is beyond comprehension.",
  };
}

// This function is no longer a Genkit flow and doesn't need to be async.
// It simulates score calculation and retrieves pre-written roasts.
function generateCringeIndexFlow(
  // input parameter is kept for signature consistency with the frontend call, but not used.
  _input: GenerateCringeIndexInput 
): GenerateCringeIndexOutput {
  // Simulate cringe score calculation (e.g., based on EXIF, or for now, random)
  const cringeIndex = Math.floor(Math.random() * 101); // Random score between 0 and 100

  const { redFlags, explanation } = getPredefinedRoasts(cringeIndex);

  const output: GenerateCringeIndexOutput = {
    cringeIndex,
    redFlags,
    explanation,
  };
  
  // Validate output against schema - this is good practice even for non-AI flows
  const parsedOutput = GenerateCringeIndexOutputSchema.safeParse(output);
  if (!parsedOutput.success) {
    console.error("Output validation error:", parsedOutput.error.flatten());
    // Fallback or throw error if schema validation fails
    return {
        cringeIndex: 0,
        redFlags: ["Error: Could not generate valid roast data."],
        explanation: "An internal error occurred while preparing the roast.",
    };
  }

  return parsedOutput.data;
}

// Wrapper function, now marked async to satisfy Next.js Server Action requirements
export async function generateCringeIndex(input: GenerateCringeIndexInput): Promise<GenerateCringeIndexOutput> {
  // The internal logic is synchronous, but returning it from an async function
  // correctly wraps it in a Promise.
  return generateCringeIndexFlow(input);
}

// Removed: AI prompt definition and Genkit flow definition (ai.definePrompt, ai.defineFlow)
// The previous error handling for AI model output is no longer relevant.
// Direct return or schema validation error handling is now used.
