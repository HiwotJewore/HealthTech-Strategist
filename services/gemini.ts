
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export async function analyzeHealthTechInput(
  inputs: { type: string; data: string | File }[]
): Promise<any> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const parts: any[] = [{ text: "Analyze the provided healthcare leadership input and generate the modernization report in the specified JSON format." }];

  for (const input of inputs) {
    if (typeof input.data === 'string') {
      parts.push({ text: input.data });
    } else {
      const base64 = await fileToBase64(input.data);
      parts.push({
        inlineData: {
          mimeType: input.data.type,
          data: base64
        }
      });
    }
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json"
    }
  });

  return JSON.parse(response.text || '{}');
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}
