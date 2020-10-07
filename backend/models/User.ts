import mongoose, { Document, Schema, HookNextFunction } from 'mongoose';
import TaskList from './TaskList'
import bcrypt from 'bcryptjs';
import Task from './Task'

const HASH_ROUNDS = 10;

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    taskListId: number;
    totalPoints: number;
    totalBonus: number;
    updatedDate: Date;
    validatePassword(password: string): boolean;
    updatePoints(taskListId: number, points: number, bonus: number): object;
}

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalPoints: { type: Number },
    totalBonus: {type: Number},
    taskListId: { type: Number },
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
        var taskList = new TaskList();
        await taskList.save()

        var newTasks = await Task.find({}).select('taskId -_id')

        taskList.collection.findOneAndUpdate(
            { taskListId: taskList.taskListId}, 
            { $push: {unfinishedTasks: newTasks} },
           function (error, success) {
                 if (error) {
                     console.log(error);
                 }
             });

        thisObj.taskListId = taskList.taskListId

        return next();
    } catch (e) {
        return next(e);
    }
});

userSchema.methods.validatePassword = async function (pass: string) {
    return bcrypt.compare(pass, this.password);
};

userSchema.methods.updatePoints = async function (taskListId:any, points: any, bonus: any) {
    try {
        const thisObj = this as IUser;
        var doc = await thisObj.collection.findOneAndUpdate(
            {
                taskListId: taskListId
            }, 
            {
                $set: {
                    totalPoints: points,
                    totalBonus: bonus, 
                    updatedDate: new Date(Date.now())
                }
            });

        return doc
    } catch (e) {
        return {"error":e.toString()}
    }
};

export default mongoose.model<IUser>('User', userSchema);