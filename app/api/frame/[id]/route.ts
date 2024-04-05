
import { getFrameHtmlResponse } from "@coinbase/onchainkit";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, context: any): Promise<Response | undefined> {
    try {
        const { params: { id } } = context
        const client = await clientPromise!;
        const db = client.db(process.env.DB_NAME);

        const query = {
            _id: new ObjectId(id)
        }

        let data = await db.collection("user-memes").findOne(query);

        if (!data?.frame) {
            return new NextResponse('NO_FRAME_FOUND', { status: 400 })
        }
        return new NextResponse(data.frame)
    } catch (error: any) {
        return new NextResponse(error)
    }
}