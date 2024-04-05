


import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import ContestUserFrameMapping from "../../../../models/contest-user-frame-mapping";
import dbConnect from "../../../../lib/dbConnect";
import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from "@coinbase/onchainkit";


export async function GET(req: NextRequest, context: any): Promise<Response | undefined> {
    try {
        const { params: { id } } = context
        await dbConnect();
        const query = {
            _id: new ObjectId(id)
        }
        const frame = await ContestUserFrameMapping.findById(query);
        if (!frame) {
            return new NextResponse('NO_FRAME_FOUND', { status: 400 })
        }

        return new NextResponse(frame.frame)
    } catch (error: any) {
        return new NextResponse(error)
    }
}

export async function POST(req: NextRequest, context: any): Promise<Response | undefined> {
    try {
        const { params: { id } } = context
        const body: FrameRequest = await req.json();
        const { message } = await getFrameMessage(body);
        const fid = message?.interactor?.fid;

        await dbConnect();
        const query = {
            _id: new ObjectId(id)
        }
        // Check if user already submitted
        const existingFrame = await ContestUserFrameMapping.findById(query)
        if (!existingFrame) {
            return new NextResponse('NO_FRAME_FOUND', { status: 400 })
        }
        if ((existingFrame?.participants || []).includes(fid)) {
            return new NextResponse(getFrameHtmlResponse({
                image: "https://cms.jotform.com/uploads/answers/answer/rarrondo/791708_Captura%20de%20pantalla%202016-03-10%20a%20las%2014.06.02.png",
                buttons: [
                    {
                        label: 'Go To Contest!!',
                        action: "link",
                        target: `${process.env.MEME_CASTER_URL}/contest/${existingFrame.contest}`
                    },
                ],

            }))
        }
        // apply vote
        const frame = await ContestUserFrameMapping.findByIdAndUpdate(query, { $addToSet: { participants: fid } }, { new: true });
        if (!frame) {
            return new NextResponse('NO_FRAME_FOUND', { status: 400 })
        }

        return new NextResponse(getFrameHtmlResponse({
            image: "https://cms.jotform.com/uploads/answers/answer/rarrondo/791708_Captura%20de%20pantalla%202016-03-10%20a%20las%2014.06.02.png",
            buttons: [
                {
                    label: 'Go To Contest!',
                    action: "link",
                    target: `${process.env.MEME_CASTER_URL}/contest/${frame.contest}`
                },
            ],
        }))
    } catch (error: any) {
        return new NextResponse(error)
    }
}