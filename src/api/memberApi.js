import axios from '../utils/axios';

export const memberListApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/members`, {
        params: params,
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const memberDetailApi = memberIdx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/members/${memberIdx}`)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const updateMemberApi = (memberIdx, member) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/admin/members/${memberIdx}`, member)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
