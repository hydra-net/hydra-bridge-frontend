export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url: string): Promise<Response> {
  const requestOptions: any = {
    method: 'GET',
  };
  return await fetch(url, requestOptions);
}

function post(
  url: string,
  body: any,
  contentType: string = 'application/json'
): Promise<Response> {
  const requestOptions: any = {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions);
}

function put(
  url: string,
  body: any,
  contentType: string = 'application/json',
  stringify: boolean = true
): Promise<Response> {
  const requestOptions: any = {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: stringify ? JSON.stringify(body) : body,
  };
  return fetch(url, requestOptions);
}

function _delete(url: string): Promise<Response> {
  const requestOptions: any = {
    method: 'DELETE',
  };

  return fetch(url, requestOptions);
}
