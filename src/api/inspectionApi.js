import axios from '../utils/axios';

export const fetchInspectionListApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/inspections`, {
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

export const fetchInspectionDetailApi = inspectionIdx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/inspections/${inspectionIdx}`)
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
