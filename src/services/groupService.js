import axios from "../utils/axios";


export const getGroupList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/groups`)
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



export const registGroup = (group) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/groups`, group)
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


export const getAdminGroups = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/groups`, {
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

export const getAdminGroupDetail = (groupIdx) => {
  return new Promise((resolve, reject) => {
    axios
    .get(`/api/admin/groups/${groupIdx}`)
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

export const updateGroup = (groupIdx, group) => {
  return new Promise((resolve, reject) => {
    axios
    .put(`/api/admin/groups/${groupIdx}`, group)
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

export const deleteGroup = (groupIdx) => {
  return new Promise((resolve, reject) => {
    axios
    .delete(`/api/admin/groups/${groupIdx}`)
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