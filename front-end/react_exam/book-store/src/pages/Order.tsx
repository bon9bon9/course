import { useLocation } from 'react-router-dom';
import Title from '../components/common/Title';
import { CartStyle } from './Cart';
import CartSummary from '../components/cart/CartSummary';
import { OrderItemInfo, OrderSheet } from '../models/order.model';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import { useForm } from 'react-hook-form';
import FindAddressButton from '../components/order/FindAddressButton';

const Order = () => {
  const location = useLocation();
  const orderDataFromCart = location.state;
  const {totalQuantity, totalPrice, firstBookTitle} = orderDataFromCart;

  const {register,handleSubmit, formState :{errors}} = useForm<OrderSheet>();

  const handlePay = (formData : OrderSheet) => {
    const orderData : OrderSheet = {
      ...formData, 
      delivery_fee : 3000,
      payment : 'CARD'
    };
    console.log(orderData);
  }
  return (
    <>
      <Title size = "large">주문서 작성</Title>
      <CartStyle>
        <div className="content">
          <div className="order-info">
            <Title size='medium' color='text'>
              배송정보
            </Title>
            <form className = "delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText 
                    inputType = "text"
                    {...register ("address",{required : true})}/>
                </div>
                <FindAddressButton onComplete = {(address) => {}}/>
              </fieldset>
              {errors.address && <p className='error-text'>주소를 입력해주세요</p>}
              
              <fieldset>
                <label>상세주소</label>
                <div className="input">
                  <InputText inputType = "text"
                  {...register ("address_detail",{required : true})}/>
                </div>
              </fieldset>
              {errors.address_detail && <p className='error-text'>상세주소를 입력해주세요</p>}

              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText inputType = "text"
                  {...register ("name",{required : true})}/>
                </div>
              </fieldset>
              {errors.name && <p className='error-text'>수령인을 입력해주세요</p>}

              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText inputType = "text"
                  {...register ("contact",{required : true})}/>
                </div>
              </fieldset>
              {errors.contact && <p className='error-text'>전화번호를 입력해주세요</p>}
            </form>
          </div>
          <div className="order-info">
            <Title size = "medium" color = "text">
              주문 상품
            </Title>
            <strong>{firstBookTitle} 등 총 {totalQuantity}권</strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice}/>
          <Button size = "large" scheme='primary' onClick={handleSubmit(handlePay)}>
                결제하기
          </Button>
        </div>
      </CartStyle>
    </>
    
  );
}


export default Order;