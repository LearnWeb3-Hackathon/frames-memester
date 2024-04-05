import { getFrameHtmlResponse } from "@coinbase/onchainkit";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../utils/mongodb";

export async function POST(req: NextRequest): Promise<Response | undefined> {
    try {
        const { imageUrl, networkId, address } = await req.json();
        const client = await clientPromise!;
        const db = client.db(process.env.DB_NAME);

        if (!imageUrl || !address || !networkId) {
            return new NextResponse('Image Url / Wallet Address / Network Id is required!', { status: 400 })
        }

        const frame = getFrameHtmlResponse({
            image: imageUrl,
        })

        const payload = {
            frame,
            address,
            imageUrl,
            networkId
        }

        let userMeme = await db.collection("user-memes").insertOne(payload);

        return new NextResponse(JSON.stringify(userMeme))
    } catch (error: any) {
        return new NextResponse(error)
    }
}

export async function GET(req: NextRequest): Promise<Response | undefined> {
    try {
        const client = await clientPromise!;
        const db = client.db(process.env.DB_NAME);

        let userMeme = await db.collection("user-memes").find({}).toArray();

        return new NextResponse(JSON.stringify(userMeme))
    } catch (error: any) {
        return new NextResponse(error)
    }
}