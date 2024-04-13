import apiRequests from "../services/Axios/configs/configs";

export const apiGetRequest = (route, token = undefined) => {
  return apiRequests.get(route, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const apiPostRequest = (
  route,
  token = undefined,
  data = undefined
) => {
  return apiRequests.post(route, data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
  });
};

export const apiPutRequest = (route, token = undefined, data = undefined) => {
  return apiRequests.put(route, data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};
