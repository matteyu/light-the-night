import API from 'axios';

//const env = 'localhost:8000'
const env = 'ia-ltn-challenge-api.herokuapp.com'

export async function redirectData(
    path: string, 
    token: string, 
    method = 'get', 
    data = {}, 
    extraArgs = ''
    ){

    const headers = {
        'Content-Type':'application/json',
        'Authorization': `Token ${token}`
    }

    
    const url = `http://${window.location.hostname}:8000/api/v1/${path}/${extraArgs}`


    if(method === 'post'){
        return await API.post(url, data, {headers})
    }
    else if (method === 'get'){
        return await API.get(url, {headers})
    }
    else if (method === 'put'){
        return await API.put(url, data, {headers})
    }

}

export async function getTasks(){
    const headers = {
        'Content-Type':'application/json'
    }
    
    const url = `http://${env}/gettasks`

    var res = await API.get(url, {headers})
    return {'data': res}
}

export async function getUsers(){
    const headers = {
        'Content-Type':'application/json'
    }
    
    const url = `http://${env}/getusers`

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

    const url = `http://${env}/getusertasks`

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

    const url = `http://${env}/updateusertasks`

    var res = await API.post(url, data, {headers})
    return {'data': res}
}