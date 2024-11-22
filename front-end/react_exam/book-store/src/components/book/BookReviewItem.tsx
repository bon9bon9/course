import { Review } from '../../models/book.model';
import { formatDate } from '../../utils/format';
import { styled } from 'styled-components';

interface Props {
  review : Review;
}

const BookReviewItem = ({ review } : Props) => {
  return (
    <BookReviewItemStyle>
      <header className="header">
        <div>
          <span>{review.userName}</span>
          <span>{review.score}</span>
        </div>
        <div>
          {formatDate(review.createdAt)}
        </div>
      </header>

      <div className="content">
        <p>{review.content}</p>
      </div>
      
    </BookReviewItemStyle>
  );
}

const BookReviewItemStyle = styled.div`
  
`;

export default BookReviewItem;