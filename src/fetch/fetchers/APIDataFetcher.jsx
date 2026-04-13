import { postUrl, getUrlWithBearer, postUrlNoCred } from "./FetchKit";
import { handleShowError } from "../../SetError";
import { ErrorBadgeContext } from "../../contexts/Contexts";
import { ErrorBadge, Severities } from "../models/ErrorBadgeModel";


export async function postUserRegister(url, usrName, psw, displayName, email, setError) {
  
  const body = {
    "username": usrName,
    "displayName": displayName,
    "password": psw,
    "email": email,
  };

  const response = await postUrl(url, body);

  if (response === null) {
    // server error
    handleShowError(new ErrorBadge("Register: Server error", "Pls try to register again or refresh the page", Severities.HIGH), setError)
    return null;
  } else if (await response.timestamp !== undefined) {
    // failed to register
    console.log(response);
    handleShowError(new ErrorBadge("Failed to register", "Pls try to register again or refresh the page", Severities.HIGH), setError)
    return null;
  }
  
  return response;
}

export async function postUserVerify(url, usrName, psw, displayName, email) {
  const body = {
    "username": usrName,
    "displayName": displayName,
    "password": psw,
    "email": email,
  };
  
  const response = await postUrl(url, body);
  
  if (response === null) {
    // server error
    return null;
  } else if (await response.timestamp !== undefined) {
    // failed to verify
    return null;
  }
  
  return response;
}

export async function postUserLogin(url, usrNameOrEmail, psw, setToken, setError) {
  const body = {
    "usernameOrEmail" : usrNameOrEmail,
    "password" : psw,
  };

  const response = await postUrlNoCred(url, body);

  if (response === null) {
    // server error
    handleShowError(new ErrorBadge("Login: Server error", "Pls try to log in again or refresh the page", Severities.HIGH), setError)
    return null;
  } else if (await response.timestamp !== undefined) {
    // failed to login
    handleShowError(new ErrorBadge("Failed to log in", "Pls try to log in again or refresh the page", Severities.HIGH), setError)
    return null;
  }
  setToken(response.jwtToken);

  return response;
}

export async function getUserLogout(url, jwtToken, setUser, setToken, setError) {
  const response = await getUrlWithBearer(url, jwtToken);

  if (response === null) {
    // server error
    handleShowError(new ErrorBadge("Logout: Server error", "Pls try again or refresh the page", Severities.HIGH), setError);
    return null;
  } else if (await response.timestamp !== undefined) {
    // failed to login
    handleShowError(new ErrorBadge("Failed to log out", "Pls try again or refresh the page", Severities.HIGH), setError);
    return null;
  }

  setUser(null);
  setToken(null);

  return response;
}

export async function getUserGetInfo(url, setUser, token) {
  
  const response = await getUrlWithBearer(url, token);
  
  if (response === null) {
    // server error
    return;
  } else if (await response.timestamp !== undefined) {
    // failed to get user info
    return;
  }

  setUser(response);
}

export async function postRefresh(url, setToken) {
  const body = {
    "" : "",
  };

  const response = await postUrl(url, body);

  if (response === null) {
    // server error
    return null;
  } else if (await response.timestamp !== undefined) {
    // failed to login
    return null;
  }

  setToken(response.jwtToken);
  return response.jwtToken;
}

export async function postRefreshWithJWT(url, token, setToken) {
  const body = {
    "jwt" : token,
  };

  const response = await postUrl(url, body);

  if (response === null) {
    // server error
    return null;
  } else if (await response.timestamp !== undefined) {
    // failed to login
    return null;
  }

  setToken(response.jwtToken);
}