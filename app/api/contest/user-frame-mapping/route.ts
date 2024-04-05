import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import ContestUserFrameMapping from '../../../models/contest-user-frame-mapping';
import Contest from '../../../models/contest';

export async function GET(req: NextRequest): Promise<Response | undefined> {
    try {
        await dbConnect()
        const contests = await ContestUserFrameMapping.find({}).sort({ startedAt: 1 });
        return new NextResponse(JSON.stringify(contests), { status: 200 })
    } catch (error: any) {
        return new NextResponse(error)
    }
}
export async function POST(req: NextRequest): Promise<Response> {
    try {
        const { imageUrl, networkId, address, contest } = await req.json();
        await dbConnect()

        if (!imageUrl || !address || !networkId || !contest) {
            return new NextResponse(JSON.stringify({ message: 'Required information is missing!' }), { status: 400 })
        }

        const payload = {
            imageUrl, networkId, address, contest
        }

        let contestUserFrame = await ContestUserFrameMapping.create(payload);

        const frame = getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Up Vote',
                },
            ],
            image: imageUrl,
            post_url: `${process.env.DOMAIN_URL}/api/contest/user-frame-mapping/${contestUserFrame._id}`,
        })
        let [contestFrameUpdate, contestUpdate] = await Promise.all([
            ContestUserFrameMapping.findByIdAndUpdate({ _id: contestUserFrame._id }, { $set: { frame } }, { new: true }),
            Contest.findByIdAndUpdate({ _id: contest }, { $push: { contestFrames: contestUserFrame._id } }, { new: true })
        ]);
        return new NextResponse(JSON.stringify(contestFrameUpdate))
    } catch (error: any) {
        return new NextResponse(error)
    }
}
