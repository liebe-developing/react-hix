import apiRequests from "../configs/configs";

export const regsiter_Auth = (route,data)=>{
    return apiRequests.post(route,data)
}