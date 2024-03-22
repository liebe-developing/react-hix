import axios from "axios";

const BaseHixUrl = {
  BASE_URL: "https://portal.hixdm.com",
  USER_PLAN_ID: -1,
};

export const RegisterUser = (formData) => {
  axios.post(`${BaseHixUrl.BASE_URL}/api/auth/register`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
