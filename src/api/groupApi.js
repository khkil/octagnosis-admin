import axios from '../utils/axios';

export const groupListApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/groups`, {
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

export const groupDetailApi = idx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/groups/${idx}`)
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

export const groupRegistApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/admin/groups`, params)
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

export const groupUpdateApi = (idx, group) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/admin/groups/${idx}`, group)
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

export const groupCodeConfigApi = idx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/groups/${idx}/code-config`)
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

export const saveGroupCodeConfigApi = (idx, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/admin/groups/${idx}/code-config`, params)
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
