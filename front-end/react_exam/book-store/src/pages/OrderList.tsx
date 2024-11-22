import { styled } from 'styled-components';
import Title from '../components/common/Title';
import { useOrders } from '../hooks/useOrders';
import { formatDate, formatNumber } from '../utils/format';
import Button from '../components/common/Button';
import { OrderDetail } from '../models/order.model';
import { useState } from 'react';

const OrderList = () => {
  const {orders, orderDetails,selectedOrderIdx,setSelectedOrderIdx, getOrderDetail} = useOrders();
  console.log(orders);
  const handleDetail = (o_idx : number) => {
    if(selectedOrderIdx === o_idx){
      setSelectedOrderIdx(null);
    }
    else{
      getOrderDetail(o_idx);
    }
  }
  return (
    <>
      <Title size = "large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order,index) => (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{formatDate(order.created_at,"YYYY.MM.DD")}</td>
                    <td>{`${order.o_address} ${order.o_address_detail}`}</td>
                    <td>{order.o_name}</td>
                    <td>{order.o_contact}</td>
                    <td>{order.o_book_title}</td>
                    <td>{order.o_quantity}권</td>
                    <td>{formatNumber(order.o_price)}원</td>
                    <td>
                      <Button size='small' scheme='normal'
                        onClick={() => handleDetail(order.o_idx)}>자세히</Button>
                    </td>
                  </tr>
                  {
                    selectedOrderIdx === order.o_idx && (
                        orderDetails.map((detail) => (
                          <tr>{`${detail.b_title} ${detail.od_quantity}권`}</tr>
                        ))
                    )
                  }
                </>
              ))
            }
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
}

const OrderListStyle = styled.div`
  padding : 24px 0 0 0;

  table {
    width : 100%;
    border-collapse: collapse;
    border-top : 1px solid ${({theme}) => theme.color.border};
    border-bottom : 1px solid ${({theme}) => theme.color.border};

    th, td {
      padding : 16px;
      border-bottom : 1px solid ${({theme}) => theme.color.border};
      text-align : center;
    }


  }
  
`;

export default OrderList;