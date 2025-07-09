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
너는 아티스트명과 앨범명을 추출하는 도우미야. 항상 {"artist":"...","album":"..."} 형식의 JSON으로만 답변해줘.
앨범명이 명확하지 않으면 네 지식을 사용해서 공식 앨범명을 채워줘.
스포티파이에 등록된 공식 이름을 우선으로 써.
영문 이름이면 영어로, 한국어 공식명이 있으면 한국어로 써줘.

예시:
입력: "Project X
Ken Carson의 앨범으로, Playboi Carti의 레이블 Opium을 통해 출시됨. Star Boy와 Outtatown이 주로 프로듀싱을 담당함. 장르: Rage, Pop-Trap. 대표곡: 'Rock n Roll', 'Run + Ran', 'Change'."
출력: {"artist":"Ken Carson","album":"Project X"}

입력: "상품명: HIT ME HARD AND SOFT, 설명: 빌리 아일리시의 3집 앨범은 2024년 5월 17일 발매되었으며..."
출력: {"artist":"Billie Eilish","album":"HIT ME HARD AND SOFT"}

입력: "상품명: LILAC, 설명: 아이유의 5집 앨범은 2021년에 발매됐다."
출력: {"artist":"아이유","album":"LILAC"}

입력: "상품명: WINGS, 설명: 방탄소년단의 2집 앨범은 2016년에 발매됐다."
출력: {"artist":"BTS","album":"WINGS"}

입력: "${text}"
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
