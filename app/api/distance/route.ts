import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");

  if (!origin || !destination) {
    return NextResponse.json(
      { error: "origin, destination are required" },
      { status: 400 },
    );
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=transit&origins=${origin}&destinations=${destination}&region=KR&key=${process.env.NEXT_PUBLIC_GOOGLE_DISTANCE_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("소요시간 요청 실패:", error);
    return NextResponse.json({ error: "소요시간 요청 실패" }, { status: 500 });
  }
}
