import axios from "../utils/axios";
import { getRefreshToken, setAccessToken, setRefreshToken } from "./tokenService";

export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/auth/login', credentials)
      .then((response) => {
        if (response.status === 200) {
          const accessToken = response.headers["authorization"];
          const refreshToken = response.headers["refresh-token"];

          console.log(response.headers)
          setAccessToken(accessToken)
          setRefreshToken(refreshToken);

          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const validateToken = () => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/auth/validate-token')
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

export const logout = () => {
  localStorage.removeItem('accessToken');
}

export const checkId = (id) => {
  const params = { id: id } ;
  return new Promise((resolve, reject) => {
    axios
      .post('/api/auth/check-id', params)
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

export const validateAccessToken = () => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/auth/reissue-token', params)
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

export const reissueAccessToken = () => {
  return new Promise((resolve, reject) => {
    const refreshToken = getRefreshToken();
    axios
      .post('/api/auth/reissue-token', {
        headers: {
          refreshToken: refreshToken
        }
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const getAuthInfo = () => {
  const accessToken = localStorage.getItem('accessToken');
  return new Promise((resolve, reject) => {
    axios
      .get('/api/auth/info')
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

export function signUp(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/sign-up", credentials)
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

export function sendAuthSms(params) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/send-sms", params)
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

export function validateSms(number) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/check-sms", {"number": number})
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

export function findId(credentials, type){
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/auth/find-id/${type}`, {
        params: credentials
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

export function resetPassword(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/reset-password", credentials)
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
