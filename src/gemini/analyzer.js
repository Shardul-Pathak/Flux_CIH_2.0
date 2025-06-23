import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyATBMahZQ10Vb9NB482J1_efMdjLxDEvxs" });

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
  return response.text;
}
export { genMessage };