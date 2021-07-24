import API from 'axios';

//const env = 'localhost:8000'
const env = 'https://ia-ltn-challenge-api.herokuapp.com'

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

    const url = `${env}/login`

    var res = await API.post(url, data, {headers})
    return {'data': res}
}

