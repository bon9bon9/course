import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Book, Review } from "../models/book.model";
import { fetchBook, fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { useQuery } from "react-query";
import { fetchBookReview } from "../api/review.api";

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data, isLoading : isBooksLoading } = useQuery(["books", location.search], () => (
    fetchBooks({
      category : params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
      order : params.get(QUERYSTRING.ORDER) || undefined,
      size : params.get(QUERYSTRING.SIZE) ? Number(params.get(QUERYSTRING.SIZE)) : 8,
      page : params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
    })
  ));
  // const [books, setBooks] = useState<Book[]>([]);
  // const [pagination, setPagination] = useState<Pagination>({
  //   page: 1,
  //   size: 10,
  //   total_count: 0
  // });
  // const [isEmpty, setIsEmpty] = useState(true);

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   fetchBooks({
  //     category : params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
  //     order : params.get(QUERYSTRING.ORDER) || undefined,
  //     size : params.get(QUERYSTRING.SIZE) ? Number(params.get(QUERYSTRING.SIZE)) : 8,
  //     page : params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
  //   }).then((res) => {
  //     setBooks(res.data);
  //     setPagination(res.pageInfo);
  //     setIsEmpty(res.data.length === 0);
  //   })
  // },[location.search]);
  return {
    books : data?.data,
    pagination : data?.pageInfo,
    isEmpty : data?.data.length === 0,
    isBooksLoading
  }
}

export const useBook = (bookId : string | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    if(!bookId) return;
    fetchBook(bookId).then((book) => {
      if(book.data.length){
        setBook(book.data[0]);
      }else setBook(null);
    });

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews);
    })
  },[bookId]);

  return {book, reviews};
}