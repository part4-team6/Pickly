import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

// 받은 쿠키 분해해서 accessToken만 발라내기
export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access-token");
    const csrfTokenFromCookie = cookieStore.get("csrf-token")?.value;

    const headerStore = await headers();
    const csrfTokenFromHeader = headerStore.get("x-csrf-token");

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "accessToken not found" },
        { status: 401 }
      );
    }

    if (
      !csrfTokenFromCookie ||
      !csrfTokenFromHeader ||
      csrfTokenFromCookie !== csrfTokenFromHeader
    ) {
      return NextResponse.json(
        { success: false, message: "CSRF validation failed" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, accessToken }, { status: 200 });
  } catch (error) {
    console.log("쿠키 읽기 실패", error);
    return NextResponse.json(
      { success: false, message: "서버 오류" },
      { status: 500 }
    );
  }
}
