const url = 'http://158.101.166.74:8080/api/data/illia_cherkasov/';

export const getData = entityName => fetch(url + entityName);

export const postData = (entityName, objInJson) => fetch(
  `${url}${entityName}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: objInJson }),
  },
);

export const updateData = (entityName, id, objInjson) => fetch(
  `${url}${entityName}/${id}`,
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: objInjson }),
  },
);

export const deleteData = (entityName, id) => fetch(
  `${url}${entityName}/${id}`,
  {
    method: 'DELETE',
    mode: 'no-cors',
  },
);
