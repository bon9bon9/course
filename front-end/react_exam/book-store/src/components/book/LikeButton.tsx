import { styled } from 'styled-components';
import { Book } from '../../models/book.model';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa";
import { useState } from 'react';
import { fetchLike } from '../../api/books.api';
import Button from '../common/Button';
import { getToken, useAuthStore } from '../../store/authStore';
import { useAlert } from '../../hooks/useAlert';


interface Props {
  book : Book;
  onClick: () => void
}

const LikeButton = ({book, onClick} : Props) => {
  const [liked, setLiked] = useState<boolean>(book.liked === 1);
  const handleClick = () => {
    if(!getToken()){
      window.alert("로그인이 필요한 서비스 입니다");
      return;
    }else{
      fetchLike(book.b_idx);
      setLiked(!liked);
    }
    
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