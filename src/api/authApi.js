import axios from "../utils/axios";

export const loginApi = (params) => {
  params.role = "ROLE_ADMIN";
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/login`, params)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const logoutApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/logout`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const validateTokenApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/validate-token`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });

}