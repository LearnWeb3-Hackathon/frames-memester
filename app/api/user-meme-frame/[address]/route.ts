
import { getFrameHtmlResponse } from "@coinbase/onchainkit";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../utils/mongodb";

export async function GET(req: NextRequest, context: any): Promise<Response | undefined> {
    try {
        const { params: { address } } = context
        const client = await clientPromise!;
        const db = client.db(process.env.DB_NAME);

        let userMeme = await db.collection("user-memes").find({ address }).toArray();

        return new NextResponse(JSON.stringify(userMeme))
    } catch (error: any) {
        return new NextResponse(error)
    }
}