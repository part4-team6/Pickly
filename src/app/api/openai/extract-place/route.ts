import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json(
        { error: "Missing text in request body" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    });

    const prompt = `
You are an assistant that extracts only the most representative place name (such as a restaurant, landmark, or hotel) from user input, including the city or region if mentioned. 
If the input contains a specific location (like Cheonan, Chungcheongnam-do), include it in the place name.
Respond only with {"place": "장소명"}.

Examples:
Input: "천안 중앙분식 좋아요 중앙분식은 충청남도 천안시 동남구 충절로, 중앙고등학교 근처에 위치한 오랜 역사를 가진 분식집..."
Output: {"place": "천안 중앙분식"}

Input: "이곳은 싱가폴에 있는 마리나베이 호텔입니다. 엄청 멋져요"
Output: {"place": "마리나 베이 샌즈 호텔"}

Input: "${text}"
`;

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
    console.error("Gemini API 호출 실패:", {
      message: err.message,
      name: err.name,
      stack: err.stack,
      cause: err.cause,
    });
    return NextResponse.json(
      { error: "Gemini API 호출 실패", detail: err.message },
      { status: 500 }
    );
  }
}
