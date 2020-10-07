import API from 'axios';

//const env = 'localhost:8000'
const env = 'ia-ltn-challenge-api.herokuapp.com'

export async function login(username: string, password: string, firstName='', lastName=''){
    const headers = {
        'Content-Type':'application/json'
    }
    
    var data: any = {
        "email": username,
        "password": password
    }
    
    if(firstName !== '' && lastName !== ''){
        data['firstName'] = firstName
        data['lastName'] = lastName

    }

    const url = `http://${env}/login`

    var res = await API.post(url, data, {headers})
    return {'data': res}
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
