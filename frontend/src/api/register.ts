import API from 'axios';

export async function register(
    username: string, 
    password: string, 
    password2: string, 
    email: string){

    const headers = {
        'Content-Type':'application/json'
    }
    
    const data = {
        "username": username,
        "email": email,
        "password": password,
        "password2": password
    }

    const url = `http://${window.location.hostname}:8000/api/v1/accounts/`

    var res = await API.post(url, data, {headers})

    return {'data': res, 'next': '/login'}
}