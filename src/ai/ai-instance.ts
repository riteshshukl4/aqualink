import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

if (!process.env.GOOGLE_GENAI_API_KEY) {
  console.warn('GOOGLE_GENAI_API_KEY is not set, Genkit flows will not work.');
}

export const ai = genkit({
  promptDir: './prompts',
  plugins: process.env.GOOGLE_GENAI_API_KEY
    ? [
        googleAI({
          apiKey: process.env.GOOGLE_GENAI_API_KEY,
        }),
      ]
    : [],
  model: 'googleai/gemini-2.0-flash',
});
