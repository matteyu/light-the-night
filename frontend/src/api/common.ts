import API from 'axios';

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
