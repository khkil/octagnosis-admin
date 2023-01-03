import axios from "axios";
import { useHistory } from "react-router-dom";
import { reissueToken } from "../redux/actions/authActions";
import store from "../redux/store/index";
import { reissueAccessToken, validateToken } from "../services/authService";
import { getAccessToken, getRefreshToken, setAccessToken } from "../services/tokenService";

const { dispatch } = store;

axios.create({
  validateStatus: (status) => status < 500,
});


axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if(accessToken){
      config.headers['Authorization'] = accessToken;
    }
    if(refreshToken){
      config.headers['refresh-token'] = refreshToken;
    }

    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

axios.interceptors.response.use(
  (config) => {

    const { headers } = config;
    const accessToken = getAccessToken();
    const newAccessToken = headers.authorization;
    
    if(newAccessToken && accessToken !== newAccessToken){
      setAccessToken(newAccessToken);
    }
    
    return config;
  },
  (e) => {
    const originalConfig = e.config;
    const { response } = e;
    if(response.status === 403){
      originalConfig.retry = true;
      reissueAccessToken()
      .then(response => {
        const { authorization } = response.headers;
        setAccessToken(authorization);
        location.reload();
      }) 
      .catch(e => {
        console.error(e);
        location.href = "/admin/login";
      })
    }
    return Promise.reject(e);
  }
);



export default axios;
