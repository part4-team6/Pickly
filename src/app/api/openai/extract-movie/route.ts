import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    });

    const prompt = `You are an assistant that extracts movie or drama titles from user input. 
Respond only in the format: {"trailer": "작품명 official trailer"}.
Use your knowledge to identify the most likely correct title.
Only include the title, not the year or other metadata:
{"trailer": "작품명 official trailer"}

예시:
입력: "어제 오펜하이머를 봤는데 정말 대단했어"
출력: {"trailer": "Oppenheimer official trailer"}

입력: "${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    const resultText = response.text ?? "";
    return NextResponse.json({ result: resultText.trim() });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Gemini API 호출 실패", detail: err.message },
      { status: 500 }
    );
  }
}
