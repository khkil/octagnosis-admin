import axios from "../utils/axios";

export const fileUpload = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return new Promise((resolve, reject) => {
    axios
      .post('/api/file/upload', formData)
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
