export interface Cart { 
  c_idx: number,
  user_idx: number,
  book_idx: number,
  c_quantity: number,
  created_at:string,
  updated_at:string,
  b_title:string,
  b_img: number,
  b_price: number,
  b_description:string,
}