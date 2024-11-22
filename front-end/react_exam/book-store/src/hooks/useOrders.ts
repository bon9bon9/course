import { useEffect, useState } from "react"
import { Order, OrderDetail } from "../models/order.model"
import { fetchOrderDetail, fetchOrders } from "../api/order.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderIdx, setSelectedOrderIdx] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  const getOrderDetail = (o_idx : number) => {
    fetchOrderDetail(o_idx).then((orderDetails) => {
      setSelectedOrderIdx(o_idx);
      setOrderDetails(orderDetails);
    })
  }
  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    })
  },[])

  return {orders, getOrderDetail, orderDetails, setSelectedOrderIdx, selectedOrderIdx};
}