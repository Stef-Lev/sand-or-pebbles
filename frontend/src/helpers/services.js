export const getOneMethod = (url, id) => {
  return fetch(url + id).then((res) => res.json());
};

export const getAllMethod = (url) => {
  return fetch(url).then((res) => res.json());
};

export const postMethod = (url, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

export const updateMethod = (url, id, body) => {
  return fetch(url + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const deleteMethod = (url, id) => {
  return fetch(url + id, {
    method: "DELETE",
  }).then((res) => res.json());
};
