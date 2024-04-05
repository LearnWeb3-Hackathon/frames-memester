


import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Contest from "../../../../models/contest";
import dbConnect from "../../../../lib/dbConnect";


export async function GET(req: NextRequest, context: any): Promise<Response | undefined> {
    try {
        const { params: { id } } = context
        await dbConnect();
        const query = {
            _id: new ObjectId(id)
        }
        const contest = await Contest.findById(query);
        if (!contest) {
            return new NextResponse('NO_FRAME_FOUND', { status: 400 })
        }

        return new NextResponse(contest.frame)
    } catch (error: any) {
        return new NextResponse(error)
    }
}

export async function PUT(req: NextRequest, context: any): Promise<Response | undefined> {
    try {
        const { params: { id } } = context

        const body = await req.json();

        await dbConnect();
        const query = {
            _id: new ObjectId(id)
        }
        const contest = await Contest.findByIdAndUpdate(query, body, { new: true });
        if (!contest) {
            return new NextResponse('NO_FRAME_FOUND', { status: 400 })
        }
        return new NextResponse(contest)
    } catch (error: any) {
        return new NextResponse(error)
    }
}