import { postUrl, getUrlWithBearer, postUrlNoCred, postUrlWithBearer } from "./FetchKit";
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
  const response = await getUrlWithBearer(url, jwtToken, setToken);

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

export async function getUserGetInfo(url, setUser, token, setToken) {
  
  const response = await getUrlWithBearer(url, token, setToken);
  
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
    // failed to refresh
    return null;
  }

  setToken(response.jwtToken);
  return response.jwtToken;
}

export async function postNewTodoList(url, todoList, token, setToken, setError) {
  const body = {
    "todos": [],
    "title": todoList.title,
    "icon": todoList.icon,
  }

  const response = await postUrlWithBearer(url, body, token, setToken);

  if (response === null) {
    handleShowError(new ErrorBadge("Post todo list: Server error", "Pls try again", Severities.HIGH), setError);
    return null;
  } else if (await response.timestamp !== undefined) {
    handleShowError(new ErrorBadge("Failed to post todo list", "Pls try again", Severities.HIGH), setError);
    return null;
  }

  return response;
}

export async function getAllTodos(url, setError, token, setToken) {
  const response = await getUrlWithBearer(url, token, setToken);

  if (response === null) {
    handleShowError(new ErrorBadge("Fetch todos: Server error", "Pls try again", Severities.HIGH), setError);
    return null;
  } else if (await response.timestamp !== undefined) {
    handleShowError(new ErrorBadge("Failed to fetch todos", "Pls try again", Severities.HIGH), setError);
    return null;
  }

  return response;
} 

export async function postUpdateTodo(url, todoModel, token, setToken, setError) {

  const body = {
    "description": todoModel.description,
    "id": todoModel.id,
    "priority": todoModel.priority,
    "status": todoModel.status,
    "title": todoModel.title,
    "todoList": {
      "children": [],
      "icon": todoModel.todoList.icon,
      "id": todoModel.todoList.id,
      "parent": todoModel.todoList.parent,
      "title": todoModel.todoList.title
    }
  };

  const response = await postUrlWithBearer(url, body, token, setToken);
  
  if (response === null) {
    handleShowError(new ErrorBadge("Update todo: Server error", "Pls try again", Severities.HIGH), setError);
    return null;
  } else if (await response.timestamp !== undefined) {
    handleShowError(new ErrorBadge("Failed to update todo", "Pls try again", Severities.HIGH), setError);
    console.log(response);
    console.log(todoModel);
    return null;
  }
  
  return response;
}

export async function postUpdateList(url, listModel, token, setToken, setError) {
  const body = {
    id: listModel.id,
    icon: listModel.icon,
    title: listModel.title,
    parent: listModel.parent,
  };

  const response = await postUrlWithBearer(url, body, token, setToken);

  if (response === null) {
    handleShowError(new ErrorBadge("Update todo list: Server error", "Pls try again", Severities.HIGH), setError);
    return null;
  } else if (await response.timestamp !== undefined) {
    handleShowError(new ErrorBadge("Failed to update todo list", "Pls try again", Severities.HIGH), setError);
    console.log(response);
    console.log(listModel);
    return null;
  }
  
  return response;
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