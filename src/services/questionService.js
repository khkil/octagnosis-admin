import axios from "../utils/axios";


export const getQuestionList = (inspectionIdx) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/questions/inspections/${inspectionIdx}`)
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

export const getQuestionDetail = (questionIdx) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/questions/${questionIdx}`)
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

export const deleteQuestion = (questionIdx) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/admin/questions/${questionIdx}`)
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

export const updateQuestion = (questionIdx, param) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/admin/questions/${questionIdx}`, param)
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

export const updateQuestions = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/admin/questions`, params)
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