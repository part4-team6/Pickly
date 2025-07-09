import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Spotify token" },
        { status: tokenRes.status }
      );
    }

    const data = await tokenRes.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log("에러 발생:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
