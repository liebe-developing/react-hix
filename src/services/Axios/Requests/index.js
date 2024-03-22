import apiRequests from "../configs/configs";

export const UserAuth = (route, data) => {
  return apiRequests.post(route, data);
};
