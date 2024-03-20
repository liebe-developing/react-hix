import apiRequests from "../configs/configs"

export const getPost = (route,data)=>{
   return apiRequests.post(route,data)
}

