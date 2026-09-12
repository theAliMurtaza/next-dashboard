import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({
        success: true,
        message: "API is running correctly",
        timeStamp: Date.now().toString(),
    });
}