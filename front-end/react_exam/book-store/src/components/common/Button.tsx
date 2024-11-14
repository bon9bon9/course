import { styled } from 'styled-components';
import { ButtonScheme, ButtonSize } from '../../style/theme';
import { FC } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children : React.ReactNode;
  size : ButtonSize;
  scheme : ButtonScheme;
  disabled? : boolean;
  isLoading? : boolean;
}

const Button : FC<Props> = ({children, size, scheme, disabled, isLoading}) => {
  return (
    <ButtonStyle size = {size} scheme={scheme} disabled = {disabled} isLoading = {isLoading}>
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
  cursor: ${({disabled}) => (disabled ? "none" : "pointer")};;
  font-size : ${({theme, size}) => theme.button[size].fontSize};
  color : ${({theme, scheme}) => theme.buttonScheme[scheme].color};
  background-color: ${({theme, scheme}) => theme.buttonScheme[scheme].backgroundColor};
  border : 0;
  border-radius :${({theme}) => theme.borderRadius.default};
  padding : ${({theme, size}) => theme.button[size].padding};
  opacity : ${({disabled}) => (disabled ? 0.5 : 1)};
  pointer-events: ${({disabled}) => (disabled ? "none" : "auto")};
`;

export default Button;