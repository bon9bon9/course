import { styled } from 'styled-components';
import Button from '../common/Button';
import { useEffect } from 'react';

interface Props {
  onComplete : (address: string) => void;
}

const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";


const FindAddressButton = ({onComplete} : Props) => {
  const handleOpen = () => {
    new window.daum.Postcode({
      onComplete : (data:any) => {
        console.log(data);
      }
    }).open();
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  },[]);
  return (
    <Button type = "button" size='medium' scheme='normal' onClick = {handleOpen}>
      주소찾기
    </Button>
  );
}

const FindAddressButtonStyle = styled.div`
  
`;

export default FindAddressButton;