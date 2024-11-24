import db from "@/lib/dbServer";
import { ISignUpPayload } from "@/types/UserAuth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload: ISignUpPayload = await request.json();
    const result = await db.register(payload);
    console.log(result);

    return NextResponse.json(result);
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: err.message || err.toString() }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
