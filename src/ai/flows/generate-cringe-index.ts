
// src/ai/flows/generate-cringe-index.ts
'use server';
/**
 * @fileOverview Generates a 'Cringe Index' score for a dating profile based on image and user input.
 * This version uses pre-written roasts based on a simulated score, with unique roasts for each percentage.
 *
 * - generateCringeIndex - A function that generates the cringe index.
 * - GenerateCringeIndexInput - The input type for the generateCringeIndex function.
 * - GenerateCringeIndexOutput - The return type for the generateCringeIndex function.
 */

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
  redFlags: z.array(z.string()).describe('List of red flags (pre-written roast highlights) identified in the profile.'),
  explanation: z.string().describe('Explanation of why the profile received this score (based on pre-written categories).'),
});
export type GenerateCringeIndexOutput = z.infer<typeof GenerateCringeIndexOutputSchema>;

interface PredefinedRoastSet {
  redFlags: string[];
  explanation: string;
}

function getPredefinedRoasts(score: number): PredefinedRoastSet {
  switch (score) {
    case 0:
      return {
        redFlags: ["Score 0: Zero cringe. You're officially unroastable."],
        explanation: "This profile is impressively cringe-free. Well done!",
      };
    // Very Low Cringe (1-10)
    case 1:
      return {
        redFlags: ["Score 1: A faint whisper of awkwardness. Barely detectable."],
        explanation: "Very low cringe (1%). Minor quirks at best, nothing to raise an alarm.",
      };
    case 2:
      return {
        redFlags: ["Score 2: So subtle, the cringe almost slipped by unnoticed."],
        explanation: "Very low cringe (2%). You're keeping it exceptionally clean.",
      };
    case 3:
      return {
        redFlags: ["Score 3: You're flying low on the cringe radar. Stealthy!"],
        explanation: "Very low cringe (3%). Almost invisible to our cringe detectors.",
      };
    case 4:
      return {
        redFlags: ["Score 4: A tiny blip of cringe. We almost missed it."],
        explanation: "Very low cringe (4%). Keep this up, and you'll be a legend.",
      };
    case 5:
      return {
        redFlags: ["Score 5: Minimal cringe interference detected."],
        explanation: "Very low cringe (5%). You're doing great, sweetie!",
      };
    case 6:
      return {
        redFlags: ["Score 6: Just a sprinkle of questionable choices."],
        explanation: "Very low cringe (6%). Barely registers on the scale of awkward.",
      };
    case 7:
      return {
        redFlags: ["Score 7: Almost cringe-proof, but not quite!"],
        explanation: "Very low cringe (7%). A little polish and you're golden.",
      };
    case 8:
      return {
        redFlags: ["Score 8: The cringe is shy with this one."],
        explanation: "Very low cringe (8%). You're on the right track.",
      };
    case 9:
      return {
        redFlags: ["Score 9: Dangerously close to zero cringe. Impressive!"],
        explanation: "Very low cringe (9%). One point away from perfection!",
      };
    case 10:
      return {
        redFlags: ["Score 10: A perfect 10 for low cringe. Well played."],
        explanation: "Very low cringe (10%). You've mastered subtlety.",
      };

    // Low Cringe (11-20)
    case 11:
      return {
        redFlags: ["Score 11: A slight cringe aftertaste. Manageable."],
        explanation: "Low cringe (11%). A few things could be polished, but overall not too bad.",
      };
    case 12:
      return {
        redFlags: ["Score 12: Spotted a little something... but we'll let it slide, for now."],
        explanation: "Low cringe (12%). Just a couple of minor offenses.",
      };
    case 13:
      return {
        redFlags: ["Score 13: Mildly amusing, not yet hazardous to dating prospects."],
        explanation: "Low cringe (13%). A few quirks, but who doesn't have them?",
      };
    case 14:
      return {
        redFlags: ["Score 14: The cringe is there, but it's polite about it."],
        explanation: "Low cringe (14%). Could be worse, much worse.",
      };
    case 15:
      return {
        redFlags: ["Score 15: A gentle nudge from the cringe gods."],
        explanation: "Low cringe (15%). You're still in safe territory.",
      };
    case 16:
      return {
        redFlags: ["Score 16: A few questionable pixels detected."],
        explanation: "Low cringe (16%). Some minor adjustments could help.",
      };
    case 17:
      return {
        redFlags: ["Score 17: Cringe level: 'Could use a second opinion'."],
        explanation: "Low cringe (17%). Not a disaster, but room for improvement.",
      };
    case 18:
      return {
        redFlags: ["Score 18: The awkwardness is trying to be subtle."],
        explanation: "Low cringe (18%). A few elements are borderline.",
      };
    case 19:
      return {
        redFlags: ["Score 19: Getting warmer on the cringe scale."],
        explanation: "Low cringe (19%). Edging towards more noticeable cringe.",
      };
    case 20:
      return {
        redFlags: ["Score 20: Twenty percent cringe. It's a start!"],
        explanation: "Low cringe (20%). You've officially made the cringe charts.",
      };

    // Noticeable Cringe (21-30)
    case 21:
      return {
        redFlags: ["Score 21: The cringe is starting to make itself known. Hello there!"],
        explanation: "Noticeable cringe (21%). Some elements are definitely raising eyebrows.",
      };
    case 22:
      return {
        redFlags: ["Score 22: Definitely some questionable choices here. We're taking notes."],
        explanation: "Noticeable cringe (22%). This is where the fun begins for us.",
      };
    case 23:
      return {
        redFlags: ["Score 23: We're raising an eyebrow, but not the alarm bells. Yet."],
        explanation: "Noticeable cringe (23%). A few clear indicators of cringe.",
      };
    case 24:
      return {
        redFlags: ["Score 24: The cringe is peeking through the cracks."],
        explanation: "Noticeable cringe (24%). It's becoming harder to ignore.",
      };
    case 25:
      return {
        redFlags: ["Score 25: A quarter of the way to maximum cringe! Milestone?"],
        explanation: "Noticeable cringe (25%). You're making a statement.",
      };
    case 26:
      return {
        redFlags: ["Score 26: Some elements are undeniably cringeworthy."],
        explanation: "Noticeable cringe (26%). We're starting to see a pattern.",
      };
    case 27:
      return {
        redFlags: ["Score 27: The cringe is no longer hiding."],
        explanation: "Noticeable cringe (27%). It's out and proud.",
      };
    case 28:
      return {
        redFlags: ["Score 28: This profile has character, and some of it is cringe."],
        explanation: "Noticeable cringe (28%). Definitely memorable, for some reasons.",
      };
    case 29:
      return {
        redFlags: ["Score 29: Approaching moderate cringe levels. Brace yourself."],
        explanation: "Noticeable cringe (29%). The roasts are writing themselves.",
      };
    case 30:
      return {
        redFlags: ["Score 30: Thirty percent cringe! It's a solid B- in awkwardness."],
        explanation: "Noticeable cringe (30%). Some definite areas for concern (and comedy).",
      };

    // Moderate Cringe (31-40)
    case 31:
      return {
        redFlags: ["Score 31: Okay, now we're entering Cringetopia. Population: this profile."],
        explanation: "Moderate cringe (31%). You're providing some good material for a roast.",
      };
    case 32:
      return {
        redFlags: ["Score 32: This is where the 'oof' sounds begin from our end."],
        explanation: "Moderate cringe (32%). It's getting a bit uncomfortable.",
      };
    case 33:
      return {
        redFlags: ["Score 33: Some solid cringe material detected. Quality stuff!"],
        explanation: "Moderate cringe (33%). We appreciate the effort you've put into this.",
      };
    case 34:
      return {
        redFlags: ["Score 34: Your profile is a fascinating study in cringe dynamics."],
        explanation: "Moderate cringe (34%). It's not for the faint of heart.",
      };
    case 35:
      return {
        redFlags: ["Score 35: The cringe is palpable. We can almost taste it."],
        explanation: "Moderate cringe (35%). You're making a bold statement.",
      };
    case 36:
      return {
        redFlags: ["Score 36: This profile is a journey. A cringey journey."],
        explanation: "Moderate cringe (36%). Buckle up, it's a bumpy ride.",
      };
    case 37:
      return {
        redFlags: ["Score 37: We're seeing choices, and some of them are... choices."],
        explanation: "Moderate cringe (37%). This is prime roasting material.",
      };
    case 38:
      return {
        redFlags: ["Score 38: The cringe isn't just a phase, it's a commitment."],
        explanation: "Moderate cringe (38%). This profile has layers of awkwardness.",
      };
    case 39:
      return {
        redFlags: ["Score 39: Almost at the halfway point of pure cringe. Exciting!"],
        explanation: "Moderate cringe (39%). The tension is building.",
      };
    case 40:
      return {
        redFlags: ["Score 40: Forty percent cringe. You're not holding back, are you?"],
        explanation: "Moderate cringe (40%). This profile is generously seasoned with awkward.",
      };

    // Significant Cringe (41-50)
    case 41:
      return {
        redFlags: ["Score 41: Halfway to maximum cringe! Impressive, in a terrifying way."],
        explanation: "Significant cringe (41%). This profile has several key areas for roasting.",
      };
    case 42:
      return {
        redFlags: ["Score 42: The cringe is strong with this one. Very strong."],
        explanation: "Significant cringe (42%). We're both impressed and concerned.",
      };
    case 43:
      return {
        redFlags: ["Score 43: Your choices are... bold. And cringey. Very cringey."],
        explanation: "Significant cringe (43%). This is a masterpiece of questionable decisions.",
      };
    case 44:
      return {
        redFlags: ["Score 44: This profile doesn't whisper cringe, it screams it."],
        explanation: "Significant cringe (44%). Prepare for a detailed analysis.",
      };
    case 45:
      return {
        redFlags: ["Score 45: We're witnessing a significant cringe event."],
        explanation: "Significant cringe (45%). This is not a drill.",
      };
    case 46:
      return {
        redFlags: ["Score 46: The cringe factory is working overtime on this one."],
        explanation: "Significant cringe (46%). So many opportunities for a good roast.",
      };
    case 47:
      return {
        redFlags: ["Score 47: This profile is a cornucopia of cringe."],
        explanation: "Significant cringe (47%). Where do we even begin?",
      };
    case 48:
      return {
        redFlags: ["Score 48: Each element contributes to the overall cringe symphony."],
        explanation: "Significant cringe (48%). It's a well-orchestrated disaster.",
      };
    case 49:
      return {
        redFlags: ["Score 49: One point shy of the big five-oh in cringe!"],
        explanation: "Significant cringe (49%). So close to a major cringe milestone.",
      };
    case 50:
      return {
        redFlags: ["Score 50: Fifty percent cringe! You've hit the cringe jackpot (or landmine)."],
        explanation: "Significant cringe (50%). This profile is perfectly balanced, as all cringey things should be.",
      };

    // High Cringe (51-60)
    case 51:
      return {
        redFlags: ["Score 51: Warning: High levels of secondhand embarrassment detected."],
        explanation: "High cringe (51%). We're starting to feel uncomfortable for you.",
      };
    case 52:
      return {
        redFlags: ["Score 52: This is not a drill. This is peak cringe content incoming."],
        explanation: "High cringe (52%). You're really pushing the boundaries.",
      };
    case 53:
      return {
        redFlags: ["Score 53: Are you doing this on purpose? Because it's working spectacularly."],
        explanation: "High cringe (53%). If cringe was an Olympic sport, you'd be a contender.",
      };
    case 54:
      return {
        redFlags: ["Score 54: This profile is an experience. A cringey, unforgettable experience."],
        explanation: "High cringe (54%). We're going to need a moment after this.",
      };
    case 55:
      return {
        redFlags: ["Score 55: The cringe is so dense, light bends around it."],
        explanation: "High cringe (55%). This is advanced level stuff.",
      };
    case 56:
      return {
        redFlags: ["Score 56: We're activating our emergency cringe protocols."],
        explanation: "High cringe (56%). This requires specialized handling.",
      };
    case 57:
      return {
        redFlags: ["Score 57: Your commitment to cringe is admirable, in a way."],
        explanation: "High cringe (57%). You're not afraid to be yourself, however cringey that may be.",
      };
    case 58:
      return {
        redFlags: ["Score 58: This profile is a gift that keeps on giving... cringe."],
        explanation: "High cringe (58%). Just when we think we've seen it all...",
      };
    case 59:
      return {
        redFlags: ["Score 59: Teetering on the edge of 'very high cringe'. Thrilling!"],
        explanation: "High cringe (59%). The anticipation is palpable.",
      };
    case 60:
      return {
        redFlags: ["Score 60: Sixty percent cringe. This is getting serious (and hilarious)."],
        explanation: "High cringe (60%). You've crossed a significant threshold.",
      };

    // Very High Cringe (61-70)
    case 61:
      return {
        redFlags: ["Score 61: The Cringe Index is screaming. Make it stop! (Don't actually stop)."],
        explanation: "Very high cringe (61%). This profile is a goldmine of awkwardness.",
      };
    case 62:
      return {
        redFlags: ["Score 62: Did you consult a manual on 'How to Be Cringe'? It paid off."],
        explanation: "Very high cringe (62%). You've clearly studied the art.",
      };
    case 63:
      return {
        redFlags: ["Score 63: This profile is a masterclass in what not to do. Bravo!"],
        explanation: "Very high cringe (63%). We're learning so much (about cringe).",
      };
    case 64:
      return {
        redFlags: ["Score 64: We're witnessing cringe evolution in real time."],
        explanation: "Very high cringe (64%). This is groundbreaking stuff.",
      };
    case 65:
      return {
        redFlags: ["Score 65: This isn't just cringe, it's performance art."],
        explanation: "Very high cringe (65%). You deserve an award for this.",
      };
    case 66:
      return {
        redFlags: ["Score 66: The sheer audacity of this cringe is breathtaking."],
        explanation: "Very high cringe (66%). We're in awe of your dedication.",
      };
    case 67:
      return {
        redFlags: ["Score 67: This profile should be preserved in a cringe museum."],
        explanation: "Very high cringe (67%). For future generations to study.",
      };
    case 68:
      return {
        redFlags: ["Score 68: Is there a contest for cringiest profile? You might win."],
        explanation: "Very high cringe (68%). You're a strong contender.",
      };
    case 69:
      return {
        redFlags: ["Score 69: Nice. (But also, very, very cringey)."],
        explanation: "Very high cringe (69%). A legendary score for a legendary cringe profile.",
      };
    case 70:
      return {
        redFlags: ["Score 70: Seventy percent cringe. You're in the cringe hall of fame."],
        explanation: "Very high cringe (70%). This is truly an achievement.",
      };

    // Extremely High Cringe (71-80)
    case 71:
      return {
        redFlags: ["Score 71: We need a moment. The cringe is overwhelming our sensors."],
        explanation: "Extremely high cringe (71%). It's almost an art form at this point.",
      };
    case 72:
      return {
        redFlags: ["Score 72: This is avant-garde cringe. Truly groundbreaking and baffling."],
        explanation: "Extremely high cringe (72%). You're pushing the envelope of awkward.",
      };
    case 73:
      return {
        redFlags: ["Score 73: Your profile has ascended to legendary cringe status. All hail!"],
        explanation: "Extremely high cringe (73%). We are not worthy (but we will roast).",
      };
    case 74:
      return {
        redFlags: ["Score 74: This level of cringe is a rare sighting. Document everything!"],
        explanation: "Extremely high cringe (74%). We're witnessing history.",
      };
    case 75:
      return {
        redFlags: ["Score 75: Three-quarters of the way to pure, unadulterated cringe!"],
        explanation: "Extremely high cringe (75%). You're a true artist of the awkward.",
      };
    case 76:
      return {
        redFlags: ["Score 76: This profile is not for the faint of cringe."],
        explanation: "Extremely high cringe (76%). Viewer discretion is advised.",
      };
    case 77:
      return {
        redFlags: ["Score 77: We're experiencing sympathy cringe on an unprecedented scale."],
        explanation: "Extremely high cringe (77%). Our faces are stuck in a cringe.",
      };
    case 78:
      return {
        redFlags: ["Score 78: This profile is a vortex of cringe. There's no escape."],
        explanation: "Extremely high cringe (78%). We're being pulled in!",
      };
    case 79:
      return {
        redFlags: ["Score 79: So close to the 80s cringe club. The tension is unbearable!"],
        explanation: "Extremely high cringe (79%). You're on the cusp of greatness.",
      };
    case 80:
      return {
        redFlags: ["Score 80: Eighty percent cringe! This is expert level cringe mastery."],
        explanation: "Extremely high cringe (80%). You've honed your craft well.",
      };

    // Severe Cringe (81-90)
    case 81:
      return {
        redFlags: ["Score 81: Dangerously cringey. Approach with extreme caution and a hazmat suit."],
        explanation: "Severe cringe (81%). This profile is a monument to awkward decisions.",
      };
    case 82:
      return {
        redFlags: ["Score 82: This profile should be studied by cringeologists worldwide."],
        explanation: "Severe cringe (82%). It's a scientific marvel of awkwardness.",
      };
    case 83:
      return {
        redFlags: ["Score 83: You've unlocked a new level of cringe. Congratulations? Or condolences?"],
        explanation: "Severe cringe (83%). We're not sure how to feel, but we will roast.",
      };
    case 84:
      return {
        redFlags: ["Score 84: This level of cringe might be contagious. We're backing away slowly."],
        explanation: "Severe cringe (84%). Handle with care.",
      };
    case 85:
      return {
        redFlags: ["Score 85: We're officially nominating this for Cringe Profile of the Year."],
        explanation: "Severe cringe (85%). The competition is fierce, but you're a frontrunner.",
      };
    case 86:
      return {
        redFlags: ["Score 86: This profile is a perfect storm of cringe elements."],
        explanation: "Severe cringe (86%). Every detail contributes to the masterpiece.",
      };
    case 87:
      return {
        redFlags: ["Score 87: Our cringe meters are redlining. This is intense!"],
        explanation: "Severe cringe (87%). You're pushing our systems to their limits.",
      };
    case 88:
      return {
        redFlags: ["Score 88: This profile is so cringey, it's starting to loop back to being art."],
        explanation: "Severe cringe (88%). It's a fine line, and you're tap-dancing on it.",
      };
    case 89:
      return {
        redFlags: ["Score 89: Just one more point to reach the legendary 90% cringe mark!"],
        explanation: "Severe cringe (89%). The suspense is cringetastic!",
      };
    case 90:
      return {
        redFlags: ["Score 90: Ninety percent cringe! You are a true connoisseur of cringe."],
        explanation: "Severe cringe (90%). This is a lifetime achievement award in awkwardness.",
      };

    // Peak Cringe (91-100)
    case 91:
      return {
        redFlags: ["Score 91: Maximum Cringe Overload! System critical! Send help (and snacks)."],
        explanation: "Peak cringe (91%). This profile is an epic saga of cringe, destined for the history books.",
      };
    case 92:
      return {
        redFlags: ["Score 92: This isn't just cringe, it's a lifestyle. A very public, cringey lifestyle."],
        explanation: "Peak cringe (92%). You're an inspiration to aspiring cringe lords.",
      };
    case 93:
      return {
        redFlags: ["Score 93: You've won the Cringe Olympics. The medal is... this roast."],
        explanation: "Peak cringe (93%). Wear it with pride (or shame, your call).",
      };
    case 94:
      return {
        redFlags: ["Score 94: This profile is the final boss of cringe. We're barely surviving."],
        explanation: "Peak cringe (94%). We'll need therapy after this roast.",
      };
    case 95:
      return {
        redFlags: ["Score 95: We've reached peak cringe. There's nowhere to go but... even more cringe?"],
        explanation: "Peak cringe (95%). You've broken the cringe-o-meter.",
      };
    case 96:
      return {
        redFlags: ["Score 96: This profile is a national treasure of cringe. Protect it at all costs."],
        explanation: "Peak cringe (96%). It's a historical artifact.",
      };
    case 97:
      return {
        redFlags: ["Score 97: The cringe levels are over 9000! (Well, 97, but close enough)."],
        explanation: "Peak cringe (97%). It's legendary.",
      };
    case 8:
      return {
        redFlags: ["Score 98: Your profile is so cringey, it has its own gravitational pull."],
        explanation: "Peak cringe (98%). We're caught in its orbit of awkwardness.",
      };
    case 99:
      return {
        redFlags: ["Score 99: One percent away from absolute, total, undeniable cringe perfection."],
        explanation: "Peak cringe (99%). The anticipation for 100% is almost too much!",
      };
    case 100:
      return {
        redFlags: ["Score 100: PERFECTION! You've achieved 100% Cringe! We bow before your mastery!"],
        explanation: "Peak cringe (100%). This profile is the G.O.A.T. - Greatest Of All Time (in cringe).",
      };

    default:
      // Fallback for any unexpected score (e.g. if Math.random glitches, though unlikely for 0-100)
      return {
        redFlags: [`Score ${score}: Cringe-o-meter is baffled. You're off the charts!`],
        explanation: "The cringe level is beyond comprehension. Or maybe it's a bug?",
      };
  }
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

    