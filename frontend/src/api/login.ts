import API from 'axios';

export async function login(username: string, password: string){
    const headers = {
        'Content-Type':'application/json'
    }
    
    const data = {
        "username": username,
        "password": password
    }
    
    const url = `http://${window.location.hostname}:8000/api/auth/token/login`

    var res = await API.post(url, data, {headers})
    return {'data': res, 'next': '/dashboard'}
}

export async function getUser(username: string, token: string){
    const headers = {
        'Content-Type':'application/json',
        'Authorization': `Token ${token}`
    }
    
    const url = `http://${window.location.hostname}:8000/api/v1/accounts/${username}/`

    var res = await API.get(url, {headers})
    return {'data': res}
}
