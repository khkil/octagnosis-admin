import axios from "../utils/axios";

export const getUserList = (inspectionIdx, page, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/users/inspections/${inspectionIdx}/pages/${page}`,{
        params: params
      })
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

export const deleteUser = (userIdx) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/users/${userIdx}`)
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

export const modifyUser = (userIdx, params) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/users/${userIdx}`, params)
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

export const getUserAnswers = (userIdx) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/users/${userIdx}/answers`)
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

export const registUserAnswers = (param) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/users/answers`, param)
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