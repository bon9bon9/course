import { OrderDetail, OrderSheet } from "../models/order.model";
import { httpClient } from "./http";

export const addOrder = async (body : OrderSheet) => {
  const response = await httpClient.post('/orders',body);
  return response.data;
}

export const fetchOrders = async () => {
  const response = await httpClient.get('/orders');
  return response.data.data;
}

export const fetchOrderDetail = async (o_idx : number) => {
  const response = await httpClient.get(`/orders/${o_idx}`);
  return response.data.data as OrderDetail[];
}