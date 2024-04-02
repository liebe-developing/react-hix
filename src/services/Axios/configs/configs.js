import axios from "axios";

const BaseHixUrl = {
  BASE_URL: "http://localhost:3000",
  USER_PLAN_ID: -1,
};

const apiRequests = axios.create({
  baseURL: BaseHixUrl.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Auth : `Bearer ` + getCookie("hix")
  },
});

export default apiRequests;
