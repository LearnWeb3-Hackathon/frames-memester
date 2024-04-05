import { bool, boolean, number } from "joi";
import mongoose from "mongoose";

export interface IContest extends mongoose.Document {
    imageUrl: string;
    networkId: string | number;
    address: string;
    title: string;
    description: string;
    startedAt: Date;
    endedAt: Date;
    frame?: string;
    amount: string;
    participantCounts: number;
    winnerPickType: string;
    winnerCounts: number;
    winners: [string];
    contestFrames: [string];
    isActive: boolean;
}
const contestSchema: mongoose.Schema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    networkId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startedAt: {
        type: Date,
        required: true
    },
    endedAt: {
        type: Date,
        required: true
    },
    frame: {
        type: String,
    },
    amount: {
        type: String,
        required: true
    },
    participantCounts: {
        type: Number,
        required: true
    },
    winnerPickType: {
        type: String,
        required: true,
        enum: ['ADMIN', 'AUTO'],
        default: 'AUTO'
    },
    winnerCounts: {
        type: Number,
        required: true
    },
    winners: {
        type: [String]
    },
    contestFrames: {
        type: [mongoose.Schema.ObjectId],
        ref: 'contest-user-frame-mapping'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
let Contest: any
try {
    Contest = mongoose.model<IContest>('contest')
} catch (error) {
    Contest = mongoose.model<IContest>('contest', contestSchema)
}
// const Contest = mongoose.model<IContest>('contest', contestSchema);
export default Contest