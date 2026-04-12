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

export async function getUrlWithBearer(url, token) {
  const r = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    credentials: "include",
  })

  try {
    const output = await r.json();
    return output;
  } catch {
    return null;
  }
}

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

export async function postUrlWithBearer(url, body, token) {
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
    credentials: "include",
  })

  try {
    const output = await r.json();
    return output;
  } catch {
    return null;
  }
}