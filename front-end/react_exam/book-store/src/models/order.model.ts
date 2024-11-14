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