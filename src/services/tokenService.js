
export const setRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
}

export const getRefreshToken = () => {
  return localStorage.refreshToken;
}

export const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
}

export const getAccessToken = () => {
  return localStorage.accessToken;
}