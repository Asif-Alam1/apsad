import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { logger } from 'genkit/logging';

// Configure enhanced AI with better settings
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});

// Export for use in flows
export { logger };