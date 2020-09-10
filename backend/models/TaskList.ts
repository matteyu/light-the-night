import mongoose, { Document, Schema, HookNextFunction } from 'mongoose';
import Task from './Task'
import User from './User'

export interface ITaskList extends Document {
    taskListId: number;
    finishedTasks: number[];
    unfinishedTasks: number[];
    updateTasks(taskListId: number, finishedTasks: number[], unfinishedTasks: number[]): object;
}

const taskListSchema = new Schema({
    taskListId: { type: Number, required: true, unique: true },
    finishedTasks: { type: [Number]},
    unfinishedTasks: { type: [Number]}
});

taskListSchema.pre('save', async function (next: HookNextFunction) {
    const thisObj = this as ITaskList;

    try {
        Task.find({}, (err, tasks) => {
            tasks.forEach((task) => {
              thisObj.unfinishedTasks.push(task.taskId)
            });
        });
        return next();
    } catch (e) {
        return next(e);
    }
})

taskListSchema.methods.updateTasks = async function (taskListId:number, finishedTasks: number[], unfinishedTasks: number[]) {
    try {
        var doc = await this.findOneAndUpdate({taskListId: taskListId}, {finishedTasks: finishedTasks, unfinishedTasks: unfinishedTasks});


        var taskPoints: any[] = await Task.aggregate([
            { $match: { taskId: { $in: doc.finishedTasks } } },
            { $group: { _id: null, points: { $sum: "$points" } } }
        ])

        var totalBonus = Math.floor(doc.finishedTasks.length/5) * 5
        var totalPoints = taskPoints[0].points + totalBonus
        var user = await User.findOne({ taskListId: taskListId }).exec();
        var updateUser = null
        if(user){
            updateUser = await user.updatePoints(taskListId, totalPoints)
        }
        else{
            updateUser = {}
        }

        return {'TaskList': doc, 'User': updateUser}
    } catch (e) {
        return {}
    }
};

export default mongoose.model<ITaskList>('TaskList', taskListSchema);