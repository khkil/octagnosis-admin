import axios from "../utils/axios";

export const getMemberList = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/members`, {
        params: params,
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

export const getMemberDetail =(idx) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/members/${idx}`)
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

export const updateMember = (idx, member) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/member/${idx}`, member)
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

