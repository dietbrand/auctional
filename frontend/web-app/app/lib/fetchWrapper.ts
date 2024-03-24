import { getTokenAlt } from '@/app/actions/authActions';

const baseUrl = process.env.API_URL;

const get = async (url: string) => {
  const requestOptions = {
    method: 'GET',
    headers: await getHeaders(),
  };

  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
};

const post = async (url: string, body: {}) => {
  const requestOptions = {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
};

const put = async (url: string, body: {}) => {
  const requestOptions = {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
};

const del = async (url: string) => {
  const requestOptions = {
    method: 'DELETE',
    headers: await getHeaders(),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
};

const getHeaders = async () => {
  const token = await getTokenAlt();
  const headers = { 'Content-type': 'application/json' } as any;
  if (token) {
    headers.Authorization = 'Bearer ' + token.access_token;
  }
  return headers;
};

const handleResponse = async (response: Response) => {
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    data = text;
  }

  if (response.ok) {
    return data || response.statusText;
  }
  const error = {
    status: response.status,
    message: typeof data === 'string' ? data : response.statusText,
  };
  return { error };
};

export const fetchWrapper = {
  get,
  post,
  put,
  del,
};
