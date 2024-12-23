export interface Order {
  o_idx : number
  user_idx : number
  o_address :string,
  o_address_detail :string,
  o_name :string,
  o_contact :string,
  o_price : number
  o_delivery_fee : number
  o_payment :string,
  o_quantity : number
  o_book_title :string,
  o_book_type : number
  created_at :string,
  updated_at :string,
}

export interface OrderDetail extends Order {
  od_idx: number,
  orders_idx: number,
  book_idx: number,
  od_quantity: number,
  b_title : string,
}


export interface OrderItemInfo {
  c_idxs : number[],
  totalQuantity : number,
  totalPrice : number,
  firstBookTitle : string | null
}

export interface OrderSheet extends OrderItemInfo {
  address : string,
  address_detail : string,
  name : string,
  contact : string,
  delivery_fee : number,
  payment : string,
}
