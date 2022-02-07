import { parseJson } from "./requestHelper";

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw Error("Something went wrong!");

      case 401:
        throw Error("Unauthorized");

      case 403:
        throw Error("Forbidden");

      case 404:
        throw Error("Not found!");

      case 409:
        throw Error("Conflict in current state");

      case 500:
        throw Error("Something went wrong!");

      default:
        throw Error(response.statusText);
    }
  }
  const text = await response.text();
  const data: T = text && parseJson(text);

  return data;
}
