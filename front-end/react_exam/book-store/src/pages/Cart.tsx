import { styled } from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import { useMemo, useState } from 'react';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import { useAlert } from '../hooks/useAlert';
import { OrderItemInfo } from '../models/order.model';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { carts, isEmpty, deleteCart } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const {showAlert, showConfirm} = useAlert();
  const navigate = useNavigate();

  const handleCheckItem = (id : number, isChecked : boolean) => {
    if(isChecked){
      setCheckedItems(checkedItems.filter((item) => item !== id))
    }else{
      setCheckedItems((prev) => ([...prev,id]));
    }
  }

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if(checkedItems.includes(cart.c_idx)){
        return acc + cart.c_quantity;
      }
      return acc;
    },0)
  },[carts, checkedItems])
  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if(checkedItems.includes(cart.c_idx)){
        return acc + cart.b_price*cart.c_quantity;
      }
      return acc;
    },0)
  },[carts, checkedItems])

  const handleOrder = () => {
    if(checkedItems.length === 0){
      return showAlert("주문할 상품을 선택해주세요");
    }
    const orderData : OrderItemInfo = {
      c_idxs : checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle : carts.find((cart) => cart.c_idx === checkedItems[0])?.b_title as string | null
    }
    showConfirm("주문ㄱ?", () => {
      navigate("/order",{state: orderData});
    });
  }
  return (    
    <>
      <Title size = "large">장바구니</Title>
      <CartStyle>
        {
          !isEmpty ?
          <>
            <div className="content">
              {
                carts.map((cart) => (
                  <CartItem key = {cart.c_idx} 
                    cart = {cart} 
                    checkedItems={checkedItems}
                    onCheck={handleCheckItem}
                    onDelete = {deleteCart}/>
                ))
              }
            </div>
            <div className="summary">
              <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice}/>
              <Button size = "large" scheme='primary' onClick ={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
          : <Empty 
            icon = {<FaShoppingCart/>}
            title = "장바구니가 비었슈"></Empty>
        }
      </CartStyle>
    </>
  );
}

export const CartStyle = styled.div`
  display : flex;
  gap : 24px;
  justify-content: space-between;
  padding : 24px 0 0 0;
  
  .content {
    flex : 1;
    display: flex;
    flex-direction: column;
    gap : 12px;

  }

  .summary {
    display : flex;
    flex-direction: column;
    gap : 24px;
  }

  .order-info {
    h1 {
      padding : 0 0 24px 0;
    }

    border : 1px solid ${({theme}) => theme.color.border};
    border-radius : ${({theme}) => theme.borderRadius.default};
    padding : 12px;
  }

  .delivery {
    fieldset {
      border : 0;
      margin : 0;
      padding : 0 0 12px 0;
      display : flex;
      justify-content : start;
      gap : 8px;

      label {
        width : 80px;
      }

      .input {
        flex : 1;
        input {
          width : 100%;
        }
      }
    }
  }

  .error-text {
    color : red;
    margin : 0;
    padding : 0 0 12px 0;
    text-align : right;
  }
`;

export default Cart;