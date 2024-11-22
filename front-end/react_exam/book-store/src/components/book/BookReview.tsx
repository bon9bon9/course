import { Review } from '@/models/book.model';
import { styled } from 'styled-components';
import BookReviewItem from './BookReviewItem';

interface Props {
  reviews : Review[];
}

const BookReview = ({reviews} : Props) => {
  return (
    <BookReviewStyle>
      {
        reviews.map((review) => (
          <BookReviewItem review = {review}/>
        ))
      }
    </BookReviewStyle>
  );
}

const BookReviewStyle = styled.div`
  
`;

export default BookReview;