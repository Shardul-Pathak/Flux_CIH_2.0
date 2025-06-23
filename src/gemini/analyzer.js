import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyC0ZNkzqLCs8_vock4iSXhXjZfP-yMJD7E" });

async function genMessage(Policy) {
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
    {
        role: "user",
        parts: [
        { text: `` },
        { text: `${Policy}` },
        ]
    }
    ],
  });
  console.log(response.text);
  return response.text;
}
export { genMessage };
