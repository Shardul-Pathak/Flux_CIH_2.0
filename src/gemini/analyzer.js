import { GoogleGenAI } from "@google/genai";

<<<<<<< HEAD
const ai = new GoogleGenAI({
  apiKey: "AIzaSyC0ZNkzqLCs8_vock4iSXhXjZfP-yMJD7E",
});
=======
const ai = new GoogleGenAI({ apiKey: "API" });
>>>>>>> c32eeb0763608efd12fd9c8da2e6ef6759abaeea

async function genMessage(Policy) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a privacy policy evaluator.

Read the following privacy policy and analyze it based on the following 11 categories:

Transparency and Clarity (15 points)

Data Collection Practices (15 points)

Purpose of Processing and Lawful Basis (15 points)

Data Sharing and Disclosure (15 points)

Data Security Measures (10 points)

User Rights and Control (10 points)

Data Retention and Deletion Policies (5 points)

International Data Transfers (5 points)

Special Categories of Data / Specific User Groups (5 points)

Policy Updates and Compliance (5 points)

Contact and Redressal Mechanisms (5 points)

Total possible score: 100 points.

Return ONLY a valid JSON object with the following keys:

{
"summary": "[3–4 sentence summary of the policy]",
"score": [total score from 0 to 100],
"threat": "[Low risk / Medium risk / High risk and a 1-line justification]"
}

Do not include any explanations, comments, or reasoning outside the JSON object.`,
          },
          { text: `${Policy}` },
        ],
      },
    ],
  });
  console.log(response.text);
  return response.text;
}
export { genMessage };
