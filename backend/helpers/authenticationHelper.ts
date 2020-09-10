import mongoose from 'mongoose'
import User from '../models/User'
import TaskList from '../models/TaskList'

export const dbConnect = () => {
    var connStr = 'mongodb+srv://chipino:only4you@ia-ltn-challenge.wq4gf.mongodb.net/ia-ltn-challenge';
    mongoose.connect(connStr, {useNewUrlParser: true, useUnifiedTopology: true});

    return mongoose
}

export const userLogin = async(email: any, password: any) => {
    // try login
    // if can't find user, register the user
    var user = await User.findOne({ email: email }).exec();

    if(user){
        var isMatch = await user.validatePassword(password)
        if(isMatch){
            return user
        }
        else{
            return {
                "error": "Wrong password."
            }
        }
    }
    else{
        var ltnUser = new User({
            email: email,
            password: password,
            ranking: await User.countDocuments()+1
        });
        
        await ltnUser.save()

        return {
            "success": `Registered ${email}`
        }
    }
}

export const getUserTasks = async(taskListId: number) => {
    var taskList = await TaskList.findOne({taskListId: taskListId})

    if(taskList){
        return taskList
    }
    else{
        return {
            "error": "No tasks."
        }
    }
}

export const updateUserTasks = async(taskListId: number, finishedTasks: number[], unfinishedTasks: number[]) => {
    var taskList: any = await TaskList.findOne({taskListId: taskListId})
    return await taskList.updateTasks(taskListId, finishedTasks, unfinishedTasks)
}

export const updateUserPoints = async(taskListId: number, points: number) => {
    var user: any = await User.findOne({taskListId: taskListId})
    return await user.updatePoints(taskListId, points)
}