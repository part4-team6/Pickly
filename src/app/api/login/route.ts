import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// 로그인 후 accessToken을 받아서 쿠키를 생성하고
export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();
    const CSRFToken = crypto.randomBytes(32).toString("hex");

    const response = NextResponse.json({ success: true });

    response.cookies.set("access-token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 30,
    });

    response.cookies.set("csrf-token", CSRFToken, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 30,
    });

    return response;
  } catch (error) {
    console.error("쿠키 생성 중 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류" },
      { status: 500 }
    );
  }
}
