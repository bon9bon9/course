import { httpClient } from "./http";

export const fetchBookReview = async (bookId : string) => {
  const response = await httpClient.get(`/books/reviews/${bookId}`);
  return response.data;
}