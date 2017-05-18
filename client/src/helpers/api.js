import axios from 'axios';
import baseUrl from '../config/constants';

export function apiCall(path, verb, data = {}, auth = true, headers = {}) {
  if (auth) {
    headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  let axiosConfig = {
    method: verb.toLowerCase(),
    url: `${baseUrl}/${path}`,
    headers: headers
  };

  switch (verb.toLowerCase()) {
    case 'get':
      axiosConfig.params = data;
    break;

    case 'post':
    case 'put':
    case 'delete':
      axiosConfig.data = data;
    break;

    default:
      return null;
  }

  return axios(axiosConfig);
}
