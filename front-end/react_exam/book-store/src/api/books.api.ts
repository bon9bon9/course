import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http"

interface FetchBooksParams {
  category? : number;
  order?: string;
  page? : number;
  size? : number;
  keyword? : string;
}

interface FetchBooksResponse {
  pageInfo : Pagination;
  data : Book[];
}
export const fetchBooks = async (params : FetchBooksParams) => {
  try{
    const response = await httpClient.get<FetchBooksResponse>('/books',{
      params : params,
    });
    return response.data;
  }catch(error){
    return {
      data : [],
      pageInfo : {
        total_count : 0,
        page : 1,
        size : 8
      }
    }
  }
  
}