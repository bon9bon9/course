import { httpClient } from "./http";

export const fetchCategory = async () => {
  const response = await httpClient.get('/category');
  return response.data.data;
}