export interface Book {
  b_idx: number,
  b_title: string,
  b_img: number,
  category_idx: number,
  b_author: string,
  b_summary: string,
  b_description: string,
  b_price: number,
  b_pages: number,
  b_format: string,
  b_isbn: string,
  b_index: string,
  b_pub_date: string,
  created_at: string,
  updated_at: string,
  bc_name: string,
  liked: number,
  likes: number
}

export interface Review {
  id : number;
  userName : string;
  content : string;
  createdAt : string;
  score : number;

}