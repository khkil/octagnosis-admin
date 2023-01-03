export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const getPageVariables = pageInfo => {
  let result = {};
  const variableKeys = ['total', 'pageSize', 'startRow'];
  Object.keys(pageInfo).forEach(key => {
    if (variableKeys.indexOf(key) > -1) {
      result[key] = pageInfo[key];
    }
  });
  return result;
};

export const generateCode = size => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const defaultSize = 15;
  if (!size) size = defaultSize;
  let result = '';
  for (let i = 0; i < size; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const getDynamicPath = (path, params) => {
  Object.keys(params).forEach(key => {
    if (path.indexOf(key)) {
      path = path.replace(`:${key}`, params[key]);
    }
  });
  return path;
};
