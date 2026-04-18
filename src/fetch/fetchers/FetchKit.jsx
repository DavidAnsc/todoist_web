
async function makeRefresh(setToken) {
  const r = await fetch("/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({}),
    credentials: "include",
  });
  
  try {
    const output = await r.json();
    setToken(output.jwtToken);
    return output.jwtToken;
  } catch {
    return null;
  }
}

export async function getUrl(url) {
  const r = await fetch(url, {
    credentials: "include",
  })
    .then((value) => {
      if (value.json().timestamp == undefined || value.json().timestamp == null) {
        throw new Error("{src/fetch/FetchKit.jsx/getUrl()} Fetch failed due to a thrown error from the api\n\nError:\n" + value.json)
      }
    });

  try {
    const output = await r.json();
    return output;
  } catch {
    return null;
  }
}

//* THIS FUNCTION HAS REFRESH TRY
export async function getWithBearer(url, token, setToken, retried=false) {
  const r = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    credentials: "include",
  })

  if (r.status === 401 && retried === false) {
    const newToken = await makeRefresh(setToken);
    if (newToken === null) {
      return null;
    }
    return await getWithBearer(url, newToken, setToken, true);
  }

  try {
    const output = await r.json();
    return output;
  } catch {
    return null;
  }
}

export async function deleteWithBearer(url, token, setToken, retried=false) {
  const r = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    credentials: "include",
  })

  if (r.status === 401 && retried === false) {
    const newToken = await makeRefresh(setToken);
    if (newToken === null) {
      throw new Error("{src/fetch/FetchKit.jsx/deleteWithBearer()} Can't refresh access token");
    }
    return await deleteWithBearer(url, newToken, setToken, true);
  } else if (r.status >= 200 && r.status < 300) {
    return;
  } else {
    console.log(r.json());
    throw new Error("{src/fetch/FetchKit.jsx/deleteWithBearer()} Failed to complete the delete request");
  }
}

//* THIS FUNCTION HAS NO REFRESH TRY
export async function postUrl(url, body) {
  // body here should be a js object.
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  
  try {
    const output = await r.json();
    return output;
  } catch {
    return null;
  }
}

//* THIS FUNCTION HAS NO REFRESH TRY
export async function postUrlNoCred(url, body) {
  // body here should be a js object.
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  });

  try {
    const output = await r.json();
    return output;
  } catch {
    return null;
  }
}

//* THIS FUNCTION HAS REFRESH TRY
export async function postUrlWithBearer(url, body, token, setToken, retried=false) {
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
    credentials: "include",
  })

  if (r.status === 401 && retried === false) {
    const newToken = await makeRefresh(setToken);
    if (newToken === null) {
      return null;
    }
    return await postUrlWithBearer(url, body, newToken, setToken, true);
  }

  try {
    const output = await r.json();
    return output;
  } catch {
    return null;
  }
}