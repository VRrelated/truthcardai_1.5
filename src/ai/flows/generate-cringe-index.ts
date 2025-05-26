
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
        redFlags: [
            "Score 0: Zero cringe. You're officially unroastable.",
            "This profile is a beacon of hope in a sea of awkward.",
            "Honestly, we're a little disappointed. No material here!",
        ],
        explanation: "This profile is impressively cringe-free. Well done!",
      };
    // Very Low Cringe (1-10)
    case 1:
      return {
        redFlags: [
            "Score 1: A faint whisper of awkwardness. Is that a choice or a cry for help?",
            "So subtle, the cringe almost slipped by. We're watching you.",
            "You're flying low on the cringe radar, but we have excellent zoom.",
        ],
        explanation: "Very low cringe (1%). Minor quirks at best, nothing to raise an alarm.",
      };
    case 2:
      return {
        redFlags: [
            "Score 2: Your profile is like a mystery novel where the mystery is 'why?'",
            "A gentle ripple in the cringe pond. Still, ripples spread.",
            "Almost undetectable cringe... are you a cringe ninja?",
        ],
        explanation: "Very low cringe (2%). You're keeping it exceptionally clean.",
      };
    case 3:
      return {
        redFlags: [
            "Score 3: You're flying low on the cringe radar. Stealthy, but we see a pixel out of place.",
            "Is that a hint of 'trying too hard' or just bad lighting?",
            "Your profile is almost normal. Almost.",
        ],
        explanation: "Very low cringe (3%). Almost invisible to our cringe detectors.",
      };
    case 4:
      return {
        redFlags: [
            "Score 4: A tiny blip of cringe. We almost missed it, like that one typo in your bio.",
            "This is the 'elevator music' of cringe profiles. Blandly noticeable.",
            "Your profile whispers 'I might own a fedora unironically.'",
        ],
        explanation: "Very low cringe (4%). Keep this up, and you'll be a legend.",
      };
    case 5:
      return {
        redFlags: [
            "Score 5: Minimal cringe interference detected. You're practically a dating ghost.",
            "Your profile has the aura of someone who alphabetizes their spice rack.",
            "We sense a carefully curated lack of personality. Intriguing!",
        ],
        explanation: "Very low cringe (5%). You're doing great, sweetie!",
      };
    case 6:
      return {
        redFlags: [
            "Score 6: Just a sprinkle of questionable choices. Like pineapple on pizza, some might find it offensive.",
            "Is that a selfie stick, or are you just happy to see us (awkwardly)?",
            "Your bio contains a quote. We're judging you, gently.",
        ],
        explanation: "Very low cringe (6%). Barely registers on the scale of awkward.",
      };
    case 7:
      return {
        redFlags: [
            "Score 7: Almost cringe-proof, but not quite! That one photo angle is... a choice.",
            "Your hobbies include 'long walks on the beach'... and what else, competitive napping?",
            "The filter on your main pic is working overtime.",
        ],
        explanation: "Very low cringe (7%). A little polish and you're golden.",
      };
    case 8:
      return {
        redFlags: [
            "Score 8: The cringe is shy with this one, peeking out from behind a well-crafted sentence.",
            "You mentioned your star sign. That's a +1 to cringe, bucko.",
            "Your attempt at humor landed... somewhere in the next county.",
        ],
        explanation: "Very low cringe (8%). You're on the right track.",
      };
    case 9:
      return {
        redFlags: [
            "Score 9: Dangerously close to zero cringe. Your normalcy is almost suspicious.",
            "Is your profile picture from this decade? Just checking.",
            "You claim to be 'drama-free'. That's usually a red flag for drama.",
        ],
        explanation: "Very low cringe (9%). One point away from perfection!",
      };
    case 10:
      return {
        redFlags: [
            "Score 10: A perfect 10 for low cringe. You've mastered subtlety, or you're just very boring.",
            "Your profile is so safe, it comes with an airbag.",
            "We're struggling to find roast material. This is an outrage!",
        ],
        explanation: "Very low cringe (10%). You've mastered subtlety.",
      };

    // Low Cringe (11-20)
    case 11:
      return {
        redFlags: [
            "Score 11: A slight cringe aftertaste. Manageable, like a mild existential crisis.",
            "That bathroom selfie? Bold. Not good, but bold.",
            "Your profile screams 'I have a cat and I'm not afraid to talk about it... a lot.'",
        ],
        explanation: "Low cringe (11%). A few things could be polished, but overall not too bad.",
      };
    case 12:
      return {
        redFlags: [
            "Score 12: Spotted a little something... like that group photo where you're not the most attractive one.",
            "Your 'anthem' is a song from 10 years ago. Time for an update?",
            "The use of emojis in your bio is... enthusiastic.",
        ],
        explanation: "Low cringe (12%). Just a couple of minor offenses.",
      };
    case 13:
      return {
        redFlags: [
            "Score 13: Mildly amusing, not yet hazardous to dating prospects. That fish picture though...",
            "You list 'sarcasm' as a skill. Original.",
            "Your mirror is cleaner than your dating game, based on this profile.",
        ],
        explanation: "Low cringe (13%). A few quirks, but who doesn't have them?",
      };
    case 14:
      return {
        redFlags: [
            "Score 14: The cringe is there, but it's polite about it. Like a Canadian apology.",
            "Did you really need to include your height in centimeters AND inches?",
            "The 'ask me anything' in your bio is a trap, isn't it?",
        ],
        explanation: "Low cringe (14%). Could be worse, much worse.",
      };
    case 15:
      return {
        redFlags: [
            "Score 15: A gentle nudge from the cringe gods. They're whispering about your hat.",
            "Your profile picture looks like it was taken during a hostage situation.",
            "The sheer number of selfies suggests you're your own biggest fan.",
        ],
        explanation: "Low cringe (15%). You're still in safe territory.",
      };
    case 16:
      return {
        redFlags: [
            "Score 16: A few questionable pixels detected. Is that a peace sign or a gang symbol?",
            "Your passion for 'travel' is as unique as a grain of sand.",
            "The 'work hard, play hard' mantra died in 2008. Just saying.",
        ],
        explanation: "Low cringe (16%). Some minor adjustments could help.",
      };
    case 17:
      return {
        redFlags: [
            "Score 17: Cringe level: 'Could use a second opinion'. And a third. And maybe an exorcism.",
            "You're 'fluent in sarcasm'. We're fluent in 'next'.",
            "That photo with the rented Lamborghini isn't fooling anyone.",
        ],
        explanation: "Low cringe (17%). Not a disaster, but room for improvement.",
      };
    case 18:
      return {
        redFlags: [
            "Score 18: The awkwardness is trying to be subtle, but it's as subtle as a foghorn.",
            "Listing your Myers-Briggs type is the intellectual equivalent of a tribal tattoo.",
            "Your bio mentions 'good vibes only'. What is this, a yoga studio from 2012?",
        ],
        explanation: "Low cringe (18%). A few elements are borderline.",
      };
    case 19:
      return {
        redFlags: [
            "Score 19: Getting warmer on the cringe scale. Your pose looks like you're trying to summon something.",
            "The inspirational quote in your bio is truly inspiring... us to swipe left.",
            "You're 'looking for a partner in crime'. What crime? Stealing hearts or office supplies?",
        ],
        explanation: "Low cringe (19%). Edging towards more noticeable cringe.",
      };
    case 20:
      return {
        redFlags: [
            "Score 20: Twenty percent cringe. It's a start! A cringe-worthy start, but a start nonetheless.",
            "Your profile is the human equivalent of a participation trophy.",
            "We've seen more personality in a beige carpet.",
        ],
        explanation: "Low cringe (20%). You've officially made the cringe charts.",
      };

    // Noticeable Cringe (21-30)
    case 21:
      return {
        redFlags: [
            "Score 21: The cringe is starting to make itself known. Hello there, awkward turtle!",
            "That gym selfie? We get it, you lift. Can you lift our spirits after seeing this?",
            "Your profile picture looks like a stock photo for 'person trying too hard'.",
        ],
        explanation: "Noticeable cringe (21%). Some elements are definitely raising eyebrows.",
      };
    case 22:
      return {
        redFlags: [
            "Score 22: Definitely some questionable choices here. We're taking notes... on what not to do.",
            "The 'duck face' isn't ironic anymore. It's just sad.",
            "Your bio is a list of demands longer than a CVS receipt.",
        ],
        explanation: "Noticeable cringe (22%). This is where the fun begins for us.",
      };
    case 23:
      return {
        redFlags: [
            "Score 23: We're raising an eyebrow, but not the alarm bells. Yet. That shirt, though...",
            "You're 'not like other girls/guys'. Sure, Jan.",
            "The photo of you with a sedated tiger is peak tourist cringe.",
        ],
        explanation: "Noticeable cringe (23%). A few clear indicators of cringe.",
      };
    case 24:
      return {
        redFlags: [
            "Score 24: The cringe is peeking through the cracks, like a weird neighbor through blinds.",
            "Your 'about me' section is just a collection of emojis. Are you 12?",
            "That car selfie? We can see the steering wheel logo. Subtle.",
        ],
        explanation: "Noticeable cringe (24%). It's becoming harder to ignore.",
      };
    case 25:
      return {
        redFlags: [
            "Score 25: A quarter of the way to maximum cringe! Milestone? Or millstone?",
            "Your profile has more filters than a coffee shop.",
            "The 'live, laugh, love' sign in your background is a cry for help.",
        ],
        explanation: "Noticeable cringe (25%). You're making a statement.",
      };
    case 26:
      return {
        redFlags: [
            "Score 26: Some elements are undeniably cringeworthy. Like that 'plandid' shot.",
            "You claim to be an 'entrepreneur'. Of what? MLM schemes?",
            "Your bio is so generic, it could be a placeholder text.",
        ],
        explanation: "Noticeable cringe (26%). We're starting to see a pattern.",
      };
    case 27:
      return {
        redFlags: [
            "Score 27: The cringe is no longer hiding. It's out and proud, like your questionable fashion sense.",
            "Is that a vape cloud in your picture, or did your soul just leave your body?",
            "You're 'looking for someone to go on adventures with'. Does that include finding your lost dignity?",
        ],
        explanation: "Noticeable cringe (27%). It's out and proud.",
      };
    case 28:
      return {
        redFlags: [
            "Score 28: This profile has character, and some of it is cringe. Mostly cringe.",
            "The food pics are great, if this was Instagram for lonely meals.",
            "Your attempt at a 'mysterious' bio just makes you sound like you have warrants.",
        ],
        explanation: "Noticeable cringe (28%). Definitely memorable, for some reasons.",
      };
    case 29:
      return {
        redFlags: [
            "Score 29: Approaching moderate cringe levels. Brace yourself, the roasts are coming.",
            "Your 'fun fact' isn't fun. Or a fact.",
            "The sheer number of group photos makes this a game of 'Where's Waldo: The Undateable Edition'.",
        ],
        explanation: "Noticeable cringe (29%). The roasts are writing themselves.",
      };
    case 30:
      return {
        redFlags: [
            "Score 30: Thirty percent cringe! It's a solid B- in awkwardness. Or maybe a C+.",
            "Your profile is like a badly written sitcom character.",
            "We're starting to think your camera lens has a permanent cringe filter.",
        ],
        explanation: "Noticeable cringe (30%). Some definite areas for concern (and comedy).",
      };

    // Moderate Cringe (31-40)
    case 31:
      return {
        redFlags: [
            "Score 31: Okay, now we're entering Cringetopia. Population: this profile, and your pet rock.",
            "That tongue-out selfie? Are you a golden retriever or trying to date?",
            "Your bio reads like a ransom note written by a committee of clichés.",
        ],
        explanation: "Moderate cringe (31%). You're providing some good material for a roast.",
      };
    case 32:
      return {
        redFlags: [
            "Score 32: This is where the 'oof' sounds begin from our end. Mostly for your fashion choices.",
            "Listing 'The Office' as your personality isn't a personality.",
            "Your profile picture is so blurry, we thought it was Bigfoot.",
        ],
        explanation: "Moderate cringe (32%). It's getting a bit uncomfortable.",
      };
    case 33:
      return {
        redFlags: [
            "Score 33: Some solid cringe material detected. Quality stuff! Like that fedora.",
            "You're holding a fish in your picture. Groundbreaking.",
            "Your 'anthem' song is Nickelback. This explains so much.",
        ],
        explanation: "Moderate cringe (33%). We appreciate the effort you've put into this.",
      };
    case 34:
      return {
        redFlags: [
            "Score 34: Your profile is a fascinating study in cringe dynamics. Especially the mirror selfies.",
            "The philosophical quote in your bio is deeper than a puddle.",
            "You claim to be 'easygoing' but your list of dealbreakers is a novel.",
        ],
        explanation: "Moderate cringe (34%). It's not for the faint of heart.",
      };
    case 35:
      return {
        redFlags: [
            "Score 35: The cringe is palpable. We can almost taste the desperation... and cheap cologne.",
            "Is that a picture of you... with your mom? On a dating app?",
            "Your hobby is 'collecting experiences'. Like collecting dust bunnies under your bed?",
        ],
        explanation: "Moderate cringe (35%). You're making a bold statement.",
      };
    case 36:
      return {
        redFlags: [
            "Score 36: This profile is a journey. A cringey journey, with too many shirtless pics.",
            "You're 'fluent in sarcasm and movie quotes'. So, unemployable?",
            "The grainy photo from 2007 isn't doing you any favors.",
        ],
        explanation: "Moderate cringe (36%). Buckle up, it's a bumpy ride.",
      };
    case 37:
      return {
        redFlags: [
            "Score 37: We're seeing choices, and some of them are... choices. Especially the sunglasses indoors.",
            "Your bio is just your height and a cryptic emoji. Deep.",
            "The 'candid' photo looks as staged as a reality TV show.",
        ],
        explanation: "Moderate cringe (37%). This is prime roasting material.",
      };
    case 38:
      return {
        redFlags: [
            "Score 38: The cringe isn't just a phase, it's a commitment. Like that regrettable tattoo.",
            "You're 'looking for someone who can keep up'. Keep up with what? Your mediocrity?",
            "Your profile has a distinct 'lives in parents' basement' vibe.",
        ],
        explanation: "Moderate cringe (38%). This profile has layers of awkwardness.",
      };
    case 39:
      return {
        redFlags: [
            "Score 39: Almost at the halfway point of pure cringe. Exciting! Or terrifying.",
            "The 'just ask' in your bio is code for 'I have no personality'.",
            "Your profile pic is taken from such a high angle, we thought it was a drone shot.",
        ],
        explanation: "Moderate cringe (39%). The tension is building.",
      };
    case 40:
      return {
        redFlags: [
            "Score 40: Forty percent cringe. You're not holding back, are you? Especially with those pants.",
            "Your profile is a cry for help, written in emojis and bad angles.",
            "We've seen scarecrows with more inviting poses.",
        ],
        explanation: "Moderate cringe (40%). This profile is generously seasoned with awkward.",
      };

    // Significant Cringe (41-50)
    case 41:
      return {
        redFlags: [
            "Score 41: The amount of 'good vibes only' messaging is ironically giving us bad vibes.",
            "Your profile picture seems to be a screenshot of a video call. Peak effort.",
            "You list 'not being a serial killer' as a pro. The bar is low, but wow.",
        ],
        explanation: "Significant cringe (41%). This profile has several key areas for roasting.",
      };
    case 42:
      return {
        redFlags: [
            "Score 42: Is that your actual smile, or did you lose a bet to a taxidermist?",
            "Your bio reads like a terms and conditions page nobody asked for, and it's all in caps.",
            "The lighting in your photo suggests you're either a vampire or hiding from success.",
        ],
        explanation: "Significant cringe (42%). We're both impressed and concerned.",
      };
    case 43:
      return {
        redFlags: [
            "Score 43: Your choices are... bold. And cringey. Very cringey. Like that haircut.",
            "You're 'looking for the Pam to your Jim'. Honey, you're more like the Kevin.",
            "The sheer number of shirtless photos implies you're allergic to fabric.",
        ],
        explanation: "Significant cringe (43%). This is a masterpiece of questionable decisions.",
      };
    case 44:
      return {
        redFlags: [
            "Score 44: This profile doesn't whisper cringe, it screams it through a megaphone.",
            "Your 'anthem' is the theme song to an anime. We're not surprised.",
            "The picture of you 'meditating' on a public bench is peak performative wellness.",
        ],
        explanation: "Significant cringe (44%). Prepare for a detailed analysis.",
      };
    case 45:
      return {
        redFlags: [
            "Score 45: We're witnessing a significant cringe event. Possibly a cringe singularity.",
            "Your profile mentions your IQ. That's usually inversely proportional to self-awareness.",
            "The 'I don't take myself too seriously' disclaimer, followed by 10 serious selfies.",
        ],
        explanation: "Significant cringe (45%). This is not a drill.",
      };
    case 46:
      return {
        redFlags: [
            "Score 46: The cringe factory is working overtime on this one. They're gonna need a bigger factory.",
            "Your bio is a list of things you *don't* want. How about what you *do* offer?",
            "That 'candid laugh' photo? We know your friend counted to three.",
        ],
        explanation: "Significant cringe (46%). So many opportunities for a good roast.",
      };
    case 47:
      return {
        redFlags: [
            "Score 47: This profile is a cornucopia of cringe. A veritable feast of awkwardness.",
            "You're holding a sign in one pic. Is it a cry for help or your grocery list?",
            "The 'my dog is my world' photo, where the dog looks terrified.",
        ],
        explanation: "Significant cringe (47%). Where do we even begin?",
      };
    case 48:
      return {
        redFlags: [
            "Score 48: Each element contributes to the overall cringe symphony. It's like a car crash in slow motion.",
            "Your profile is an ode to bad lighting and questionable life choices.",
            "You use the word 'wanderlust' unironically. That's a bingo!",
        ],
        explanation: "Significant cringe (48%). It's a well-orchestrated disaster.",
      };
    case 49:
      return {
        redFlags: [
            "Score 49: One point shy of the big five-oh in cringe! Your commitment is noted.",
            "The 'I'm an open book' claim, followed by a profile as vague as a weather forecast.",
            "Your primary photo is you in a Halloween costume. From three years ago.",
        ],
        explanation: "Significant cringe (49%). So close to a major cringe milestone.",
      };
    case 50:
      return {
        redFlags: [
            "Score 50: Fifty percent cringe! You've hit the cringe jackpot (or landmine).",
            "This profile is perfectly balanced, as all cringey things should be. And this is VERY cringey.",
            "Halfway to unmatchable. Keep up the... work?",
        ],
        explanation: "Significant cringe (50%). This profile is perfectly balanced, as all cringey things should be.",
      };

    // High Cringe (51-60)
    case 51:
      return {
        redFlags: [
            "Score 51: Warning: High levels of secondhand embarrassment detected. We need protective gear.",
            "Your profile is a masterclass in how to repel potential dates.",
            "The only thing you're 'catching' in that fishing photo is our scorn.",
        ],
        explanation: "High cringe (51%). We're starting to feel uncomfortable for you.",
      };
    case 52:
      return {
        redFlags: [
            "Score 52: This is not a drill. This is peak cringe content incoming. Secure your eyeballs.",
            "Your bio is just a string of unrelated hashtags. #Desperate #Help #Why",
            "The peace sign selfie in front of a historical monument? Classy.",
        ],
        explanation: "High cringe (52%). You're really pushing the boundaries.",
      };
    case 53:
      return {
        redFlags: [
            "Score 53: Are you doing this on purpose? Because it's working spectacularly. You're a cringe artist.",
            "Your profile picture looks like you photobombed a much cooler event.",
            "Listing your Venmo in your bio is a bold move. Boldly desperate.",
        ],
        explanation: "High cringe (53%). If cringe was an Olympic sport, you'd be a contender.",
      };
    case 54:
      return {
        redFlags: [
            "Score 54: This profile is an experience. A cringey, unforgettable experience, like food poisoning.",
            "You're 'looking for someone to laugh with'. At your profile, probably.",
            "The 'gym mirror selfie with inspirational quote' combo. Deadly.",
        ],
        explanation: "High cringe (54%). We're going to need a moment after this.",
      };
    case 55:
      return {
        redFlags: [
            "Score 55: The cringe is so dense, light bends around it. And so do potential matches, away from you.",
            "Your profile is a monument to bad decisions and even worse filters.",
            "You mention being 'intellectually curious' but your photos are all at a bar.",
        ],
        explanation: "High cringe (55%). This is advanced level stuff.",
      };
    case 56:
      return {
        redFlags: [
            "Score 56: We're activating our emergency cringe protocols. This is a biohazard.",
            "The photo of you 'DJing' on a laptop in your bedroom is not the flex you think it is.",
            "Your 'ideal first date' involves reciting your cryptocurrency portfolio.",
        ],
        explanation: "High cringe (56%). This requires specialized handling.",
      };
    case 57:
      return {
        redFlags: [
            "Score 57: Your commitment to cringe is admirable, in a way. A very, very concerning way.",
            "You're 'fluent in sarcasm'. Are you also fluent in 'being single forever'?",
            "The group photo where everyone else is clearly having more fun than you.",
        ],
        explanation: "High cringe (57%). You're not afraid to be yourself, however cringey that may be.",
      };
    case 58:
      return {
        redFlags: [
            "Score 58: This profile is a gift that keeps on giving... cringe. And headaches.",
            "The picture of you with an exotic animal that looks like it wants to sue you.",
            "Your bio mentions your 'hustle'. Is that hustle annoying people on dating apps?",
        ],
        explanation: "High cringe (58%). Just when we think we've seen it all...",
      };
    case 59:
      return {
        redFlags: [
            "Score 59: Teetering on the edge of 'very high cringe'. Thrilling! For us. Not for your dating life.",
            "Your profile picture is you, in a car, wearing sunglasses, at night. Why?",
            "You list your height as '6ft (on a good day)'. We appreciate the honesty, not the cringe.",
        ],
        explanation: "High cringe (59%). The anticipation is palpable.",
      };
    case 60:
      return {
        redFlags: [
            "Score 60: Sixty percent cringe. This is getting serious (and hilarious). Seriously hilarious.",
            "Your profile is a masterwork of accidental self-sabotage.",
            "The 'looking for my queen/king' line. This isn't Game of Thrones, buddy.",
        ],
        explanation: "High cringe (60%). You've crossed a significant threshold.",
      };

    // Very High Cringe (61-70)
    case 61:
      return {
        redFlags: [
            "Score 61: The Cringe Index is screaming. Make it stop! (Don't actually stop, this is gold).",
            "Your profile is so cringe, it should come with a warning label and a therapist's number.",
            "The 'candid' shot of you 'reading' a book upside down is truly something.",
        ],
        explanation: "Very high cringe (61%). This profile is a goldmine of awkwardness.",
      };
    case 62:
      return {
        redFlags: [
            "Score 62: Did you consult a manual on 'How to Be Cringe'? It paid off. Spectacularly.",
            "Your bio is written entirely in the third person. Does 'Chad' know you're using his account?",
            "The picture where you're clearly photoshopped next to a celebrity.",
        ],
        explanation: "Very high cringe (62%). You've clearly studied the art.",
      };
    case 63:
      return {
        redFlags: [
            "Score 63: This profile is a masterclass in what not to do. Bravo! We're taking notes for our 'don't' list.",
            "You're 'not here for games'. Your profile looks like a badly designed escape room.",
            "The sheer amount of hashtags in your bio could power a small country.",
        ],
        explanation: "Very high cringe (63%). We're learning so much (about cringe).",
      };
    case 64:
      return {
        redFlags: [
            "Score 64: We're witnessing cringe evolution in real time. This is like Darwin, but for awkwardness.",
            "Your profile picture is a Bitmoji. Are you even real?",
            "You list 'breathing' as one of your hobbies. Impressive.",
        ],
        explanation: "Very high cringe (64%). This is groundbreaking stuff.",
      };
    case 65:
      return {
        redFlags: [
            "Score 65: This isn't just cringe, it's performance art. Disturbing, confusing performance art.",
            "Your profile has more red flags than a bullfighting convention.",
            "The 'deep and meaningful' quote is from a children's movie.",
        ],
        explanation: "Very high cringe (65%). You deserve an award for this.",
      };
    case 66:
      return {
        redFlags: [
            "Score 66: The sheer audacity of this cringe is breathtaking. And slightly nauseating.",
            "Your profile picture is you doing a keg stand. In your 30s.",
            "You mention your 'spirit animal'. Is it a confused pigeon?",
        ],
        explanation: "Very high cringe (66%). We're in awe of your dedication.",
      };
    case 67:
      return {
        redFlags: [
            "Score 67: This profile should be preserved in a cringe museum. For future generations to study and mock.",
            "Your bio is a single, run-on sentence that makes no sense.",
            "The photo of you 'casually' leaning against a sports car that isn't yours.",
        ],
        explanation: "Very high cringe (67%). For future generations to study.",
      };
    case 68:
      return {
        redFlags: [
            "Score 68: Is there a contest for cringiest profile? You might win. And lose at dating.",
            "Your profile picture is a meme. Are you trying to communicate or just confuse?",
            "You're 'looking for someone to complete you'. You're not a puzzle, you're a person. Hopefully.",
        ],
        explanation: "Very high cringe (68%). You're a strong contender.",
      };
    case 69:
      return {
        redFlags: [
            "Score 69: Nice. (But also, very, very cringey. Your profile is the punchline to a bad joke).",
            "This profile is so awkward, it makes us miss dial-up internet.",
            "Your fashion sense seems to be 'whatever was on the floor'.",
        ],
        explanation: "Very high cringe (69%). A legendary score for a legendary cringe profile.",
      };
    case 70:
      return {
        redFlags: [
            "Score 70: Seventy percent cringe. You're in the cringe hall of fame. Or shame. Mostly shame.",
            "Your profile is a testament to the fact that self-awareness is optional.",
            "We've seen more appealing things in a petri dish.",
        ],
        explanation: "Very high cringe (70%). This is truly an achievement.",
      };

    // Extremely High Cringe (71-80)
    case 71:
      return {
        redFlags: [
            "Score 71: We need a moment. The cringe is overwhelming our sensors. And our will to live.",
            "Your profile picture is so heavily edited, you look like a cartoon character.",
            "Your bio mentions your 'haters'. Honey, we're not haters, we're concerned citizens.",
        ],
        explanation: "Extremely high cringe (71%). It's almost an art form at this point.",
      };
    case 72:
      return {
        redFlags: [
            "Score 72: This is avant-garde cringe. Truly groundbreaking and baffling. Like modern art no one understands.",
            "Your profile looks like it was assembled by a committee of bad ideas.",
            "The 'ask me about my crypto gains' line is a guaranteed left swipe.",
        ],
        explanation: "Extremely high cringe (72%). You're pushing the envelope of awkward.",
      };
    case 73:
      return {
        redFlags: [
            "Score 73: Your profile has ascended to legendary cringe status. All hail the Cringe King/Queen!",
            "We're not sure if this is a dating profile or a cry for professional help.",
            "The picture of you with a bottle service sparkler, thinking you're a VIP.",
        ],
        explanation: "Extremely high cringe (73%). We are not worthy (but we will roast).",
      };
    case 74:
      return {
        redFlags: [
            "Score 74: This level of cringe is a rare sighting. Document everything! For science. And comedy.",
            "Your profile is so cringey, it's started to develop its own personality. A bad one.",
            "You use more emojis than words. Are you trying to communicate in hieroglyphics?",
        ],
        explanation: "Extremely high cringe (74%). We're witnessing history.",
      };
    case 75:
      return {
        redFlags: [
            "Score 75: Three-quarters of the way to pure, unadulterated cringe! You're a true artist of the awkward.",
            "Your profile is a shining example of what happens when confidence outpaces ability.",
            "The 'I'm a sapiosexual' line, usually found on profiles with zero intellectual content.",
        ],
        explanation: "Extremely high cringe (75%). You're a true artist of the awkward.",
      };
    case 76:
      return {
        redFlags: [
            "Score 76: This profile is not for the faint of cringe. Viewer discretion is advised. And a barf bag.",
            "Your 'about me' section is just a link to your SoundCloud. We're not clicking that.",
            "The selfie taken from below your chin. We call that 'The Turkey Neck Special'.",
        ],
        explanation: "Extremely high cringe (76%). Viewer discretion is advised.",
      };
    case 77:
      return {
        redFlags: [
            "Score 77: We're experiencing sympathy cringe on an unprecedented scale. Our faces are stuck in a cringe.",
            "Your profile picture is you, flexing, in a public bathroom. Why are there so many of these?",
            "You list 'making people uncomfortable' as a skill. You're excelling.",
        ],
        explanation: "Extremely high cringe (77%). Our faces are stuck in a cringe.",
      };
    case 78:
      return {
        redFlags: [
            "Score 78: This profile is a vortex of cringe. There's no escape. We're being pulled into the abyss of awkward!",
            "Your bio is an angry rant about your ex. Healthy.",
            "The picture of you 'sleeping' candidly. Sure, buddy.",
        ],
        explanation: "Extremely high cringe (78%). We're being pulled in!",
      };
    case 79:
      return {
        redFlags: [
            "Score 79: So close to the 80s cringe club. The tension is unbearable! And the fashion sense is from the 80s.",
            "Your profile is a masterclass in self-unawareness.",
            "The only 'adventure' this profile inspires is the adventure of swiping left very, very fast.",
        ],
        explanation: "Extremely high cringe (79%). You're on the cusp of greatness.",
      };
    case 80:
      return {
        redFlags: [
            "Score 80: Eighty percent cringe! This is expert level cringe mastery. You've honed your craft well. Too well.",
            "Your profile should be a case study in a psychology textbook under 'Delusions of Adequacy'.",
            "We're genuinely impressed by your ability to be this cringeworthy.",
        ],
        explanation: "Extremely high cringe (80%). You've honed your craft well.",
      };

    // Severe Cringe (81-90)
    case 81:
      return {
        redFlags: [
            "Score 81: Dangerously cringey. Approach with extreme caution and a hazmat suit. And therapy.",
            "Your profile is a monument to awkward decisions and questionable life paths.",
            "The only thing 'genuine' about this profile is its ability to induce cringes.",
        ],
        explanation: "Severe cringe (81%). This profile is a monument to awkward decisions.",
      };
    case 82:
      return {
        redFlags: [
            "Score 82: This profile should be studied by cringeologists worldwide. It's a scientific marvel of awkwardness.",
            "Your profile is so bad, it makes us want to delete the entire internet.",
            "The 'my kids are my world' picture... where you're clearly cropped out of their fun.",
        ],
        explanation: "Severe cringe (82%). It's a scientific marvel of awkwardness.",
      };
    case 83:
      return {
        redFlags: [
            "Score 83: You've unlocked a new level of cringe. Congratulations? Or condolences? Definitely condolences.",
            "This profile is an affront to good taste and common sense.",
            "The picture of you with a wad of cash. We get it, you have $73.",
        ],
        explanation: "Severe cringe (83%). We're not sure how to feel, but we will roast.",
      };
    case 84:
      return {
        redFlags: [
            "Score 84: This level of cringe might be contagious. We're backing away slowly... and calling a doctor.",
            "Your profile is a black hole from which no dignity escapes.",
            "You list 'Netflix and chill' as an interest. What year is this?",
        ],
        explanation: "Severe cringe (84%). Handle with care.",
      };
    case 85:
      return {
        redFlags: [
            "Score 85: We're officially nominating this for Cringe Profile of the Year. The competition is fierce, but you're a frontrunner.",
            "This profile is so cringey, it could curdle milk.",
            "The 'I'm a simple guy/gal' line, followed by the most complex and confusing bio ever.",
        ],
        explanation: "Severe cringe (85%). The competition is fierce, but you're a frontrunner.",
      };
    case 86:
      return {
        redFlags: [
            "Score 86: This profile is a perfect storm of cringe elements. Every detail contributes to the masterpiece of disaster.",
            "Your profile isn't just a red flag, it's a full-blown red flag parade.",
            "The selfie taken while driving. Darwin is calling.",
        ],
        explanation: "Severe cringe (86%). Every detail contributes to the masterpiece.",
      };
    case 87:
      return {
        redFlags: [
            "Score 87: Our cringe meters are redlining. This is intense! We might need a bigger meter.",
            "Your profile is the dating app equivalent of a jump scare.",
            "The 'I'm brutally honest' disclaimer, usually used by people who are just brutal.",
        ],
        explanation: "Severe cringe (87%). You're pushing our systems to their limits.",
      };
    case 88:
      return {
        redFlags: [
            "Score 88: This profile is so cringey, it's starting to loop back to being art. Horrifying, abstract art.",
            "You're not just cringe, you're the final boss of cringe.",
            "The picture of you with your pet snake. We're sure that's appealing to... someone?",
        ],
        explanation: "Severe cringe (88%). It's a fine line, and you're tap-dancing on it.",
      };
    case 89:
      return {
        redFlags: [
            "Score 89: Just one more point to reach the legendary 90% cringe mark! The suspense is cringetastic!",
            "Your profile is a national treasure... of what not to do.",
            "We're pretty sure your profile picture was taken with a potato.",
        ],
        explanation: "Severe cringe (89%). The suspense is cringetastic!",
      };
    case 90:
      return {
        redFlags: [
            "Score 90: Ninety percent cringe! You are a true connoisseur of cringe. A walking, talking disaster.",
            "This is a lifetime achievement award in awkwardness. Congratulations.",
            "Your profile is less a dating profile and more a cry for an intervention.",
        ],
        explanation: "Severe cringe (90%). This is a lifetime achievement award in awkwardness.",
      };

    // Peak Cringe (91-100)
    case 91:
      return {
        redFlags: [
            "Score 91: Maximum Cringe Overload! System critical! Send help (and snacks, roasting is hard work).",
            "This profile is an epic saga of cringe, destined for the history books. Or a bonfire.",
            "Your profile is so cringey, it should be illegal in several countries.",
        ],
        explanation: "Peak cringe (91%). This profile is an epic saga of cringe, destined for the history books.",
      };
    case 92:
      return {
        redFlags: [
            "Score 92: This isn't just cringe, it's a lifestyle. A very public, cringey lifestyle we're all witnessing.",
            "You're an inspiration to aspiring cringe lords everywhere. Please stop.",
            "Your profile is the reason aliens won't visit us.",
        ],
        explanation: "Peak cringe (92%). You're an inspiration to aspiring cringe lords.",
      };
    case 93:
      return {
        redFlags: [
            "Score 93: You've won the Cringe Olympics. The medal is... this roast. And a lifetime of solitude.",
            "Wear it with pride (or shame, your call). Mostly shame.",
            "This profile is less 'dating material' and more 'cautionary tale'.",
        ],
        explanation: "Peak cringe (93%). Wear it with pride (or shame, your call).",
      };
    case 94:
      return {
        redFlags: [
            "Score 94: This profile is the final boss of cringe. We're barely surviving this encounter.",
            "We'll need therapy after this roast. And possibly a new identity.",
            "Your profile isn't just bad, it's impressively, consistently bad.",
        ],
        explanation: "Peak cringe (94%). We'll need therapy after this roast.",
      };
    case 95:
      return {
        redFlags: [
            "Score 95: We've reached peak cringe. There's nowhere to go but... even more cringe? Is that possible?",
            "You've broken the cringe-o-meter. It exploded. We're sending you the bill.",
            "Your profile is a masterpiece of self-sabotage, painted with the brush of pure cringe.",
        ],
        explanation: "Peak cringe (95%). You've broken the cringe-o-meter.",
      };
    case 96:
      return {
        redFlags: [
            "Score 96: This profile is a national treasure of cringe. Protect it at all costs. (From ever being seen again).",
            "It's a historical artifact of what happens when someone has too much internet access.",
            "Your profile makes us yearn for the sweet release of a system crash.",
        ],
        explanation: "Peak cringe (96%). It's a historical artifact.",
      };
    case 97:
      return {
        redFlags: [
            "Score 97: The cringe levels are over 9000! (Well, 97, but close enough). It's legendary. And terrifying.",
            "Your profile isn't just a red flag; it's the entire Soviet Union's flag collection.",
            "We're convinced this profile is a social experiment to test human endurance.",
        ],
        explanation: "Peak cringe (97%). It's legendary.",
      };
    case 98:
      return {
        redFlags: [
            "Score 98: Your profile is so cringey, it has its own gravitational pull, sucking in all nearby dignity.",
            "We've seen less awkward encounters in a silent film festival. Bravo.",
            "This isn't just cringe; it's a lifestyle choice we're deeply concerned about.",
        ],
        explanation: "Peak cringe (98%). We're caught in its orbit of awkwardness.",
      };
    case 99:
      return {
        redFlags: [
            "Score 99: One percent away from absolute, total, undeniable cringe perfection. The anticipation is almost too much!",
            "Your profile is the zenith of awkward, the pinnacle of poor choices.",
            "We're on the edge of our seats. Will you achieve 100% cringe? The world (of roasters) watches.",
        ],
        explanation: "Peak cringe (99%). The anticipation for 100% is almost too much!",
      };
    case 100:
      return {
        redFlags: [
            "Score 100: PERFECTION! You've achieved 100% Cringe! We bow before your mastery!",
            "This profile is the G.O.A.T. - Greatest Of All Time (in cringe). Frame this roast.",
            "You have successfully made it impossible for anyone to want to date you. An achievement, of sorts.",
        ],
        explanation: "Peak cringe (100%). This profile is the G.O.A.T. - Greatest Of All Time (in cringe).",
      };

    default:
      // Fallback for any unexpected score
      const safeScore = Math.max(0, Math.min(100, Math.floor(score))); // Ensure score is 0-100
      return {
        redFlags: [
            `Score ${safeScore}: Cringe-o-meter is baffled. You're off the charts! Or we made a mistake.`,
            "This level of unknown cringe is either genius or a spectacular bug.",
            "Consider this a mystery roast. We're as confused as you are.",
        ],
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
        redFlags: [
            "Error: Could not generate valid roast data.",
            "Our roast generator seems to have malfunctioned.",
            "Please try again, or accept that you are unroastable by our current script."
        ],
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

    