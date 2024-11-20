import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useBook } from '../hooks/useBooks';
import BooksEmpty from '../components/books/BooksEmpty';
import { getImgSrc } from '../utils/image';
import Title from '../components/common/Title';
import { Book } from '../models/book.model';
import { formatDate, formatNumber } from '../utils/format';
import { Link } from 'react-router-dom';
import EllipsisBox from '../components/common/EllipsisBox';
import LikeButton from '../components/book/LikeButton';
import AddToCart from '../components/book/AddToCart';
import { useAuthStore } from '../store/authStore';

const bookInfoList = [
  {
    label : "카테고리",
    key : "bc_name",
    filter : (book : Book) => (
      <Link to = {`/books?category=${book.category_idx}`}>{book.bc_name}</Link>
    )  
  },
  {
    label : "포맷",
    key : "b_format"
  },
  {
    label : "페이지",
    key : "b_pages"
  },
  {
    label : "ISBN",
    key : "b_isbn"
  },
  {
    label : "출간일",
    key : "b_pub_date",
    filter : (book : Book) => {
      return `${formatDate(book.b_pub_date)}`
    }
  },
  {
    label : "가격",
    key : "b_price",
    filter : (book : Book) => {
      return `${formatNumber(book.b_price)}원`;
    }
  }
]

const BookDetail = () => {
  const { bookId } = useParams();
  const { book } = useBook(bookId);
  const {isloggedIn } = useAuthStore();
  if (!book) return (<BooksEmpty/>);  
  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img src={getImgSrc(book.b_idx)} alt={book.b_title} />
        </div>
        <div className="info">
          <Title size = "large" color = "text">
            {book.b_title}
          </Title>
          {
            bookInfoList.map((item,index) => (
              <dl key = {index}>
                <dt>{item.label}</dt>
                <dd>{item.filter ? item.filter(book) : book[item.key as keyof Book]}</dd>
              </dl>
            ))
          }
          <p className="summary">{book.b_summary}</p>
          <div className="like">
            <LikeButton book = {book}/>
          </div>
          <div className="add-cart">{isloggedIn && <AddToCart book={book}/>}</div>
        </div>
      </header>
      <div className="content">
        <Title size = "medium">상세설명</Title>
        <EllipsisBox>{book.b_description}</EllipsisBox>
        <Title size = "medium">목차</Title>
        <p>{book.b_index}</p>
      </div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  .header{
    display : flex;
    align-items: start;
    gap : 24px;
    padding : 0 0 24px 0;
    
    .img {
      flex : 1;
      img {
        width : 100%;
        height : auto;
      }
    }

    .info {
      flex : 1;
      display : flex;
      flex-direction : column;
      gap : 12px;
    }

    dl {
      display : flex;
      margin : 0;
      dt {
        width : 80px;
        color : ${({theme}) =>theme.color.secondary};
      }
      a{
        color : ${({theme}) =>theme.color.primary};
      }
    }
  }

  .content {
    
  }
`;

export default BookDetail;