import mongoose, { Document, Schema, HookNextFunction } from 'mongoose';
import TaskList from './TaskList'
import bcrypt from 'bcryptjs';

const HASH_ROUNDS = 10;

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    ranking: number;
    taskListId: number;
    updatedDate: Date;
    validatePassword(password: string): boolean;
    updatePoints(taskListId: number, points: number): object;
}

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalPoints: { type: Number },
    taskListId: { type: Number, required: true },
    updatedDate: { type: Date }
});

userSchema.pre('save', async function (next: HookNextFunction) {
    const thisObj = this as IUser;

    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(HASH_ROUNDS);
        thisObj.password = await bcrypt.hash(thisObj.password, salt);
        thisObj.taskListId = await TaskList.countDocuments()+1

        var taskList = new TaskList({
            taskListId: thisObj.taskListId
        });
        
        await taskList.save()

        return next();
    } catch (e) {
        return next(e);
    }
});

userSchema.methods.validatePassword = async function (pass: string) {
    return bcrypt.compare(pass, this.password);
};

userSchema.methods.updatePoints = async function (taskListId:number, points: number) {
    try {
        var doc = await this.findOneAndUpdate({taskListId: taskListId}, {points: points, updatedDate: new Date(Date.now())});
        
        return doc
    } catch (e) {
        return {"error":"Update points failed"}
    }
};

export default mongoose.model<IUser>('User', userSchema);