const url = 'http://158.101.166.74:8080/api/data/illia_cherkasov/';

export async function request(entity, options = {}) {
  const method = options.method || 'GET';
  const data = options.data || null;
  const id = options.id || null;
  const reqUrl = id ? `${url}${entity}/${id}` : `${url}${entity}`;
  const { emitter } = options;

  emitter.emit('data:load');
  try {
    const headers = {};
    let body;

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify({ data: JSON.stringify(data) });
    }

    const res = await fetch(reqUrl, {
      method,
      headers,
      body,
    });
    if (res.status === 204) { return res.status; }
    return await res.json();
  } catch (e) {
    emitter.emit('data:error', e);
    console.warn('Error:', e.message);
    return `Error: ${e.message}`;
  }
}

export const fromJSON = obj => {
  const item = { id: obj.id, ...JSON.parse(obj.data) };
  return item;
};

export const getDataFromJSON = (data, list) => {
  data.forEach(obj => {
    list.push(fromJSON(obj));
  });
};
