import { styled } from 'styled-components';
import { Book } from '../../models/book.model';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa";
import { useState } from 'react';
import { fetchLike } from '../../api/books.api';
import Button from '../common/Button';
import { useAuthStore } from '../../store/authStore';
import { useAlert } from '../../hooks/useAlert';


interface Props {
  book : Book;
}

const LikeButton = ({book} : Props) => {
  const [liked, setLiked] = useState<boolean>(book.liked === 1);
  const {isloggedIn } = useAuthStore();
  const showAlert = useAlert();

  const handleClick = () => {
    if(!isloggedIn){
      showAlert("로그인이 필요한 서비스쨩");
      return;
    }
    fetchLike(book.b_idx);
    setLiked(!liked);
    
    
  }

  return (
    <LikeButtonStyle size = "medium" scheme = "normal" onClick = {handleClick}>
      {liked ? <FaHeart/> : <FaRegHeart/>}
      {book.likes - book.liked + (liked ? 1 : 0)}
    </LikeButtonStyle>
  );
}

const LikeButtonStyle = styled(Button)`
  display : flex;
  gap : 6px;
`;

export default LikeButton;