import axios from "axios";

const BaseHixUrl = {
  BASE_URL: "https://portal.hixdm.com",
  USER_PLAN_ID: -1,
};

const apiRequests = axios.create({
  baseURL: BaseHixUrl.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true,
});

export default apiRequests;
