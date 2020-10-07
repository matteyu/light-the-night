import mongoose from 'mongoose'
import User from '../models/User'
import TaskList from '../models/TaskList'
import Task from '../models/Task'

export const dbConnect = () => {
    var connStr = 'mongodb+srv://chipino:only4you@ia-ltn-challenge.wq4gf.mongodb.net/ia-ltn-challenge';
    mongoose.connect(connStr, {useNewUrlParser: true, useUnifiedTopology: true});

    return mongoose
}

export const userLogin = async(email: any, password: any, firstName='', lastName='') => {
    // try login
    // if can't find user, register the user
    var user = await User.findOne({ email: email.toLowerCase() }).exec();

    if(user){
        if(firstName !== '' && lastName !== ''){
            return {
                "error": "This email is already registered."
            }
        }
        else{
            var isMatch = await user.validatePassword(password)
            if(isMatch){
                return {"success":"Login Successful! Click OK to enter the dashboard", "user": user}
            }
            else{
                return {
                    "error": "Wrong password."
                }
            }
        }
    }
    else{
        if(firstName !== '' && lastName !== ''){
            var ltnUser = new User({
                email: email.toLowerCase(),
                password: password,
                ranking: await User.countDocuments()+1,
                totalPoints: 0,
                totalBonus: 0,
                updatedDate: new Date(Date.now()),
                firstName: firstName,
                lastName: lastName
            });
            
            await ltnUser.save()
    
            return {
                "success": `Registered user ${email}`,
                "user": ltnUser
            }
        }
        else{
            return {
                "error": "Email does not exist in our records!"
            }
        }
    }
}

export const getUserTasks = async(taskListId: number) => {
    var taskList = await TaskList.findOne({taskListId: taskListId}).exec()
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

export const getUsers = async() => {
    return await User.find(
        {}, 
        { 
            _id: 0, 
            email: 1,
            totalPoints: 1,
            updatedDate: 1,
            taskListId: 1,
            totalBonus: 1,
            firstName: 1,
            lastName: 1 
        }
    )
}

export const getTasks = async() => {
    return await Task.find(
        {},
        {
            _id: 0, 
            taskId: 1,
            category: 1,
            challenge: 1,
            points: 1
        }
    )
}
