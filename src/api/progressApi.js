import axios from '../utils/axios';

export const memberProgressListApi = memberIdx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/progress/members/${memberIdx}`)
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
