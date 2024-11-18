import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";

export const useBooks = () => {
  const location = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    size: 10,
    total_count: 0
  });
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    fetchBooks({
      category : params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
      order : params.get(QUERYSTRING.ORDER) || undefined,
      size : params.get(QUERYSTRING.SIZE) ? Number(params.get(QUERYSTRING.SIZE)) : 8,
      page : params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
    }).then((res) => {
      setBooks(res.data);
      setPagination(res.pageInfo);
      setIsEmpty(res.data.length === 0);
    })
  },[location.search]);
  return {books, pagination, isEmpty}
}