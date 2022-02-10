import { parseJson } from './requestHelper';

export async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!response.ok) {
    throw Error(response.statusText + ' ' + text);
  }
  return text && parseJson(text);
}
