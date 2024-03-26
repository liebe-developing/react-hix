import apiRequests from "../services/Axios/configs/configs";

export const UserAuth = (route, data) => {
  return apiRequests.post(route, data);
};
