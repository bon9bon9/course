import { Cart } from "../models/cart.model";
import { httpClient } from "./http";

interface IAddCartParams {
  b_idx : number; 
  quantity : number;
}

export const addCart = async (body : IAddCartParams) => {
  const response = await httpClient.post('/carts',body);
  return response.data;
}

export const removeCart = async (c_idx : number) => {
  const response = await httpClient.delete(`/carts/${c_idx}`);
  return response.data;
}

export const fetchCart = async () => {
  const response = await httpClient.get('/carts');
  return response.data.data as Cart[];
}