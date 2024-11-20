import { useEffect, useState } from "react";
import { Cart } from "../models/cart.model";
import { fetchCart, removeCart } from "../api/carts.api";

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deleteCart = (c_idx : number) => {
    removeCart(c_idx).then((response) => {
      setCarts((prev) => {
        const newCarts = prev.filter((cart) => cart.c_idx !== c_idx);
        if(newCarts.length === 0) setIsEmpty(true);
        return newCarts;
      });
    })
  }

  useEffect(() => {
    fetchCart().then((carts) => {
      setCarts(carts);
      setIsEmpty(carts.length === 0);
    });
  },[])
  return {carts, isEmpty, deleteCart};
}