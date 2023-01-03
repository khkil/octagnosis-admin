import axios from '../utils/axios';

export const questionListApi = ({ inspectionIdx, params }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/questions/inspections/${inspectionIdx}`, {
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

export const questionDetailApi = questionIdx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/questions/${questionIdx}`)
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

export const updateQuestionApi = (questionIdx, question) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/admin/questions/${questionIdx}`, question)
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

export const deleteQuestionApi = questionIdx => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/admin/questions/${questionIdx}`)
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

export const insertQuestionsApi = questions => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/admin/questions`, questions)
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
