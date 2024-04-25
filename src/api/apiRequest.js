import apiRequests from "../services/Axios/configs/configs";

export const apiGetRequest = (route, token = undefined) => {
  return apiRequests
    .get(route, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
    .catch((err) => {
      if (err.response.status === 401) {
        window.location.replace("/sign-in");
      }
    });
};

export const apiPostRequest = (route, token = undefined, data = undefined) => {
  return apiRequests.post(route, data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
  });
};

export const apiPutRequest = (route, token = undefined, data = undefined) => {
  return apiRequests
    .put(route, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
    .catch((err) => {
      if (err.response.status === 401) {
        window.location.replace("/sign-in");
      }
    });
};
