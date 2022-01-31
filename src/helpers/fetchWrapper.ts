import { IApiResponse } from "../common/commonTypes";
import { parseJson } from "./requestHelper";


export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get<T>(url: string): Promise<IApiResponse<T>> {
  const requestOptions: any = {
    method: "GET",
  };
  const resp = await fetch(url, requestOptions);
  return handleResponse<T>(resp);
}

function post(
  url: string,
  body: any,
  contentType: string = "application/json"
 ) {
  const requestOptions: any = {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(
  url: string,
  body: any,
  contentType: string = "application/json",
  stringify: boolean = true
) {
  const requestOptions: any = {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: stringify ? JSON.stringify(body) : body,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function _delete(url: string) {
  const requestOptions: any = {
    method: "DELETE",
  };

  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse<T>(response: any) {
  return response.text().then((text: string) => {
    const data = text && parseJson(text);
    let resp: IApiResponse<T> = { result: data };
    if (!response.ok) {
      switch (response.status) {
        case 400:
          resp = { errorMsg: "Something went wrong!", status: 400 };
          break;

        case 401:
          resp = { errorMsg: "Unauthorized", status: 401 };
          break;

        case 403:
          resp = { errorMsg: "Forbidden", status: 403 };
          break;

        case 404:
          resp = { errorMsg: "Not found", status: 404 };
          break;

        case 409:
          resp = { errorMsg: "Conflict in current state", status: 409 };
          break;

        case 500:
          resp = { errorMsg: "Something went wrong!", status: 500 };
          break;

        default:
          const error = (data && data.message) || response.statusText;
          resp = { errorMsg: error, status: response.status };
          break;
      }
      return Promise.reject(resp);
    }

    return resp;
  });
}
