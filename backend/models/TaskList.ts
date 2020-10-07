import mongoose, { Document, Schema, HookNextFunction } from 'mongoose';
import User from './User'
import Task from './Task'
import { totalmem } from 'os';

export interface ITaskList extends Document {
    taskListId: number;
    finishedTasks: number[];
    unfinishedTasks: number[];
    updateTasks(taskListId: number, finishedTasks: number[], unfinishedTasks: number[]): object;
}

const taskListSchema = new Schema({
    taskListId: { type: Number, unique: true },
    finishedTasks: { type: Object},
    unfinishedTasks: { type: Object}
});

taskListSchema.pre('save', async function (next: HookNextFunction) {
    const thisObj = this as ITaskList;

    try {
        var tl: any = await thisObj.collection.find({}).toArray()
        if(tl.length > 0){
            tl.sort((a: any, b: any) => b.taskListId - a.taskListId);
            thisObj.taskListId = tl[0].taskListId + 1
        }
        else{
            thisObj.taskListId = 1
        }
        return next();
    } catch (e) {
        return next(e);
    }
})

taskListSchema.methods.updateTasks = async function (taskListId:number, finishedTasks: any, unfinishedTasks: any) {
    try {
        const thisObj = this as ITaskList;
        await thisObj.collection.findOneAndUpdate({taskListId: taskListId}, {$set:{finishedTasks:finishedTasks, unfinishedTasks: unfinishedTasks}});
        const allTasks: any = await Task.find({}).exec()

        const doc = await thisObj.collection.findOne({taskListId: taskListId})

        var finishedIDs = doc['finishedTasks'].map((obj: any) => {
            return obj.taskId.toString()
        })

        var totalPoints = 0

        for(var i = 0; i < allTasks.length; i++){
            if(finishedIDs.includes(allTasks[i]['taskId'].toString())){
                totalPoints = totalPoints + Number(allTasks[i]['points'])
            }
        }

        var totalBonus = Math.floor(finishedIDs.length/5) * 5
        
        var user = await User.findOne({ taskListId: taskListId }).exec();
        var updateUser: any = null
        if(user){
            updateUser = await user.updatePoints(taskListId, totalPoints, totalBonus)
        }
        else{
            updateUser = {}
        }
        return {
            'TaskList': {
                'finishedTasks': doc['finishedTasks'], 
                'unfinishedTasks': doc['unfinishedTasks']
            }, 
            'User': updateUser['value']
        }

    } catch (e) {
        return {'error':e.toString()}
    }
};

export default mongoose.model<ITaskList>('TaskList', taskListSchema);