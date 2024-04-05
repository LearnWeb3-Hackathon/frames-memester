import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import Contest from '../../models/contest';

export async function GET(req: NextRequest): Promise<Response | undefined> {
  try {
    await dbConnect()
    const contests = await Contest.find({}).sort({ startedAt: 1 });
    return new NextResponse(JSON.stringify(contests), { status: 200 })
  } catch (error: any) {
    return new NextResponse(error)
  }
}
export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { imageUrl, networkId, address, title, description, startedAt, endedAt, winnerCounts, participantCounts, amount, winnerPickType } = await req.json();
    await dbConnect()

    if (!imageUrl || !address || !networkId || !title || !description || !startedAt || !endedAt || !winnerCounts || !participantCounts || !amount || !winnerPickType) {
      return new NextResponse(JSON.stringify({ message: 'Required information is missing!' }), { status: 400 })
    }

    const payload = {
      imageUrl, networkId, address, title, description, startedAt, endedAt, winnerCounts, participantCounts, amount, winnerPickType
    }

    let contest = await Contest.create(payload);

    const frame = getFrameHtmlResponse({
      buttons: [
        {
          label: 'Participate Now!',
          action: "link",
          target: `${process.env.MEME_CASTER_URL}/contest/${contest._id}`
        },
      ],
      image: imageUrl
    })
    let update = await Contest.findByIdAndUpdate({ _id: contest._id }, { $set: { frame } }, { new: true });
    return new NextResponse(JSON.stringify(update))
  } catch (error: any) {
    return new NextResponse(error)
  }
}
