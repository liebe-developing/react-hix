import axios from "axios";

const BaseHixUrl = {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    USER_PLAN_ID: -1
};

const apiRequests = axios.create({
    baseURL : BaseHixUrl.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Auth : `Bearer` + getCookie("hix")
    }
})

export default apiRequests