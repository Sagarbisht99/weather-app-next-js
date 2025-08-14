import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic execution (no static generation)
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return new Response("Missing lat/lon", { status: 400 });
    }

    const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const dailyRes = await fetch(dailyUrl, {
      cache: "no-store", // prevent caching issues
    });

    if (!dailyRes.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const dailyData = await dailyRes.json();
    return NextResponse.json(dailyData);
  } catch (error) {
    console.error("Error in getting daily data:", error);
    return new Response("Error in getting daily data", { status: 500 });
  }
}
