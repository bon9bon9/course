import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import styled from 'styled-components';

interface LayoutProps {
  children : React.ReactNode;
}

const Layout = ({children} : LayoutProps) => {
  return (
    <LayoutStyle>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </LayoutStyle>
  )
}
const LayoutStyle = styled.main`
  width : 100%;
  margin : 0 auto;
  max-width : ${({theme}) => theme.layout.width.large};
  padding : 20px 0;
`
export default Layout
