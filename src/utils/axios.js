import axios from "axios";
let store;

export const injectStore = (_store) => {
  store = _store;
};

axios.create({
  //서버 응답 HTTP 상태 코드
  validateStatus: (status) => status < 500,
});

axios.interceptors.request.use((config) => {
  return config;
});

export default axios;
