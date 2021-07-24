import API from 'axios';

//const env = 'localhost:8000'
const env = 'https://ia-ltn-challenge-api.herokuapp.com'

export async function getTasks(){
    const headers = {
        'Content-Type':'application/json'
    }
    
    const url = `${env}/gettasks`

    var res = await API.get(url, {headers})
    return {'data': res}
}

export async function getUsers(){
    const headers = {
        'Content-Type':'application/json'
    }
    
    const url = `${env}/getusers`

    var res = await API.get(url, {headers})
    return {'data': res}
}

export async function getUserTasks(taskListId: number){
    const headers = {
        'Content-Type':'application/json'
    }
    
    var data: any = {
        "taskListId": taskListId
    }

    const url = `${env}/getusertasks`

    var res = await API.post(url, data, {headers})
    return {'data': res}
}

export async function updateUserTasks(taskListId: number, finishedTasks: any, unfinishedTasks: any){
    const headers = {
        'Content-Type':'application/json'
    }
    
    var data: any = {
        "taskListId": taskListId,
        "finishedTasks": finishedTasks,
        "unfinishedTasks": unfinishedTasks
    }

    const url = `${env}/updateusertasks`

    var res = await API.post(url, data, {headers})
    return {'data': res}
}