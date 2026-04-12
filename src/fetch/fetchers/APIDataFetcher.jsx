import { getUrl, postUrl, getUrlWithBearer, postUrlNoCred } from "./FetchKit";

export async function postUserRegister(url, usrName, psw, displayName, email) {
  const body = {
    "username": usrName,
    "displayName": displayName,
    "password": psw,
    "email": email,
  };

  const response = await postUrl(url, body);

  if (await response.timestamp !== undefined) {
    //TODO: exception case
    return null;
  }
  
  return response;
}

export async function postUserLogin(url, usrNameOrEmail, psw, setToken) {
  const body = {
    "usernameOrEmail" : usrNameOrEmail,
    "password" : psw,
  };

  const response = await postUrlNoCred(url, body);

  if (await response.timestamp !== undefined) {
    //TODO: exception case
    return null;
  }
  setToken(response.jwtToken);

  return response;
}

export async function getUserLogout(url, jwtToken, setUser, setToken) {
  const response = await getUrlWithBearer(url, jwtToken);

  if (await response.timestamp !== undefined) {
    //TODO: exception
    return null;
  }
  setUser(null);
  setToken(null);

  return response;
}

export async function getUserGetInfo(url, setUser, token) {
  
  const response = await getUrlWithBearer(url, token);
  
  if (await response.timestamp !== undefined) {
    //TODO: exception case
    return;
  }

  setUser(response);
}

export async function postRefreshToken(url, setToken) {
  const body = {
    "" : "",
  };

  const response = await postUrl(url, body);

  if (await response.timestamp !== undefined) {
    //TODO: exception case
    return null;
  }

  setToken(response.jwtToken);
  return response.jwtToken;
}

export async function postRefreshTokenWithJWT(url, token, setToken) {
  const body = {
    "jwt" : token,
  };

  const response = await postUrl(url, body);

  if (await response.timestamp !== undefined) {
    //TODO: exception case
    return;
  }

  setToken(response.jwtToken);
}

export function fetchTodoData(url) {
  return getUrl(url);
}
