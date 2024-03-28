import apiRequests from "../services/Axios/configs/configs";


export const apiGetRequest = (route, token = undefined) => {
    return apiRequests.get(route, {
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    })
}



export const apiPostRequest = (route, token = undefined, data) => {
    return apiRequests.post(route, {
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    }, data)
}

