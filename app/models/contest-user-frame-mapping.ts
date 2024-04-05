import { number } from "joi";
import mongoose from "mongoose";

export interface IContestUserFrameMapping extends mongoose.Document {
    imageUrl: string;
    networkId: string | number;
    address: string;
    contest: string;
    frame?: string;
    participants: [number];
    isActive: boolean;
}
const ContestUserFrameMappingSchema: mongoose.Schema = new mongoose.Schema({
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
    frame: {
        type: String,
    },
    contest: {
        type: mongoose.Schema.ObjectId,
        ref: 'contest',
        required: true
    },
    participants: {
        type: [Number],
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
let Contest: any
try {
    Contest = mongoose.model<IContestUserFrameMapping>('contest-user-frame-mapping')
} catch (error) {
    Contest = mongoose.model<IContestUserFrameMapping>('contest-user-frame-mapping', ContestUserFrameMappingSchema)
}
// const Contest = mongoose.model<IContest>('contest', contestSchema);
export default Contest