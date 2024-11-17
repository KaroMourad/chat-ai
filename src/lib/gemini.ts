// /lib/gemini.ts
const API_KEY = process.env.GEMINI_API_KEY; // Use your actual Gemini API key here

const geminiApiUrl = "https://api.gemini.com/v1/chat"; // Example endpoint, adjust based on the actual Gemini API documentation

export async function getGeminiResponse(userMessage: string): Promise<string> {
  const response = await fetch(geminiApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      message: userMessage, // Pass the user message here
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from Gemini API");
  }

  const data = await response.json();
  return data?.message || "Error: No response from Gemini API"; // Assuming Gemini API returns the message property
}
