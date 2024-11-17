import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { CoreMessage, streamText } from "ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error(
    "Please define the GEMINI_API_KEY environment variable."
  );
}

const genAi = createGoogleGenerativeAI({
  apiKey: GEMINI_API_KEY,
});


export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: genAi("gemini-1.5-flash"),
    messages,
  });

  return result.toDataStreamResponse();
}