import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    taskId: number;
    challenge: string;
    category: string;
    points: number;
}

const taskSchema = new Schema({
    taskId: { type: Number, unique: true },
    challenge: { type: String },
    category: { type: String, required: true, unique: true },
    points: { type: Number, required: true }
});

export default mongoose.model<ITask>('Task', taskSchema);