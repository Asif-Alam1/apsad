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
  // Enhanced configuration
  modelConfig: {
    temperature: 0.7, // Balanced creativity and accuracy
    topK: 40, // Good diversity of responses
    topP: 0.95, // Natural language generation
    maxOutputTokens: 2048, // Longer, more detailed responses
  },
  // Enable logging for debugging
  logging: {
    level: 'info',
    logger: logger,
  },
});

// Export for use in flows
export { logger };