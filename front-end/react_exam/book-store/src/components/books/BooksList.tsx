import { styled } from 'styled-components';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';

interface Props{
  books : Book[];
}

const BooksList = ({books} : Props) => {
  return (
    <BooksListStyle>
      {
        books.map((item) => (
          <BookItem key = {item.b_idx} book = {item}/>
        ))

      }
    </BooksListStyle>
  );
}

const BooksListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap : 24px
`;

export default BooksList;