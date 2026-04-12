import { getUrl, postUrl, getUrlWithBearer, postUrlNoCred } from "./FetchKit";
import { handleShowError } from "../../SetError";
import { useContext } from "react";
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

  if (await response.timestamp !== undefined) {
    if (response === null) {
      // server error
      handleShowError(new ErrorBadge("Login: Server error", "Pls try to log in again or refresh the page", Severities.HIGH), setError)
      return;
    } else if (await response.timestamp !== undefined) {
      // failed to register
      handleShowError(new ErrorBadge("Failed to log in", "Pls try to log in again or refresh the page", Severities.HIGH), setError)
    }
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
    return;
  } else if (await response.timestamp !== undefined) {
    // failed to login
    handleShowError(new ErrorBadge("Failed to log in", "Pls try to log in again or refresh the page", Severities.HIGH), setError)
  }
  setToken(response.jwtToken);

  return response;
}

export async function getUserLogout(url, jwtToken, setUser, setToken, setError) {
  const response = await getUrlWithBearer(url, jwtToken);

  if (response === null) {
    // server error
    handleShowError(new ErrorBadge("Logout: Server error", "Pls try again or refresh the page", Severities.HIGH), setError);
    return;
  } else if (await response.timestamp !== undefined) {
    // failed to login
    handleShowError(new ErrorBadge("Failed to log out", "Pls try again or refresh the page", Severities.HIGH), setError);
    return;
  }

  setUser(null);
  setToken(null);

  return response;
}

export async function getUserGetInfo(url, setUser, token, setError) {
  
  const response = await getUrlWithBearer(url, token);
  
  if (response === null) {
    // server error
    handleShowError(new ErrorBadge("Getting user data: Server error", "Pls try to log in again or refresh the page", Severities.HIGH), setError)
    return;
  } else if (await response.timestamp !== undefined) {
    // failed to get user info
    handleShowError(new ErrorBadge("Failed to get user info", "Pls try to log in again or refresh the page", Severities.HIGH), setError)
    return;
  }

  setUser(response);
}

export async function postRefresh(url, setToken, setError) {
  const body = {
    "" : "",
  };

  const response = await postUrl(url, body);

  if (response === null) {
    // server error
    handleShowError(new ErrorBadge("Refresh access token: Server error", "Pls try to refresh the page", Severities.HIGH), setError)
    return;
  } else if (await response.timestamp !== undefined) {
    // failed to login
    handleShowError(new ErrorBadge("Failed to refresh access token", "Pls try to refresh the page", Severities.HIGH), setError)
    return;
  }

  setToken(response.jwtToken);
  return response.jwtToken;
}

export async function postRefreshWithJWT(url, token, setToken, setError) {
  const body = {
    "jwt" : token,
  };

  const response = await postUrl(url, body);

  if (response === null) {
    // server error
    handleShowError(new ErrorBadge("Refresh access token: Server error", "Pls try to refresh the page", Severities.HIGH), setError)
    return;
  } else if (await response.timestamp !== undefined) {
    // failed to login
    handleShowError(new ErrorBadge("Failed to refresh access token", "Pls try to refresh the page", Severities.HIGH), setError)
    return;
  }

  setToken(response.jwtToken);
}