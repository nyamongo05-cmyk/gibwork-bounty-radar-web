import { NextResponse } from "next/server";
import { createGibworkClient } from "@gibwork/sdk/node";

export async function GET() {
  try {
    const privateKey = process.env.SOLANA_PRIVATE_KEY;

    if (!privateKey) {
      return NextResponse.json(
        { error: "SOLANA_PRIVATE_KEY is not configured" },
        { status: 500 }
      );
    }

    const client = createGibworkClient({
      privateKey,
    });

    const response = await client.tasks.listAvailable({
      page: 1,
      limit: 50,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Gibwork API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch Gibwork bounties" },
      { status: 500 }
    );
  }
}
