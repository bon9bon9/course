import { styled } from 'styled-components';
import { Cart } from '../../models/cart.model';
import Button from '../common/Button';
import Title from '../common/Title';
import { formatNumber } from '../../utils/format';
import CheckIconButton from './CheckIconButton';
import { useMemo } from 'react';
import { useAlert } from '../../hooks/useAlert';

interface Props {
  cart : Cart;
  checkedItems : number[];
  onCheck : (id:number, isChecked : boolean) => void;
  onDelete : (c_idx : number) => void;
}

const CartItem = ({cart, checkedItems, onCheck, onDelete} : Props) => {
  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.c_idx);
  },[checkedItems, cart.c_idx])
  const {showConfirm} = useAlert();
  const handleCheck = () => {
    onCheck(cart.c_idx,isChecked);
  }

  const handleDelete = () => {
    showConfirm("정말삭제하겠슈..?", () => {
      if(isChecked) onCheck(cart.c_idx,isChecked);
      onDelete(cart.c_idx);
    })
  }
  return (
    <CartItemStyle>
      <div className="info">
        <div className="check">
          <CheckIconButton isChecked = {isChecked} onCheck={handleCheck}/>
        </div>
        <div>
          <Title size = "medium" color = "text">{cart.b_title}</Title>
          <p className="summary">{cart.b_summary}</p>
          <p className="price">{formatNumber(cart.b_price)}원</p>
          <p className="quantity">{cart.c_quantity}권</p>
        </div>
      </div>
      <Button size = "medium" scheme = "normal" onClick={handleDelete} >
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
}

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border : 1px solid ${({theme}) => theme.color.border};
  border-radius : ${({theme}) => theme.borderRadius.default};
  padding : 12px;

  .info {
    display :flex;
    align-items: start;
    flex : 1;
    p {
      padding : 0 0 8px 0;
      margin : 0;
    } 

    .check { 
      width : 40px;
      flex-shrink : 0;
    }

  }

  

`;

export default CartItem;