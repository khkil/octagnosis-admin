import axios from '../utils/axios';

export const resultListApi = inspectionIdx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/inspections/${inspectionIdx}/results`)
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

export const resultDetailApi = ({ inspectionIdx, resultIdx }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/inspections/${inspectionIdx}/results/${resultIdx}`)
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

export const insertResultsApi = (inspectionIdx, resultList) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/admin/inspections/${inspectionIdx}/results`, resultList)
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

export const deleteResultApi = ({ inspectionIdx, resultIdx }) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/admin/inspections/${inspectionIdx}/results/${resultIdx}`)
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
