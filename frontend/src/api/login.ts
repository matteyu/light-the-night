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

    return await API.post(url, data, {headers})
}
