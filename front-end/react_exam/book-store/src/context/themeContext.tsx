import {createContext, ReactNode, useEffect, useState} from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

const DEFAULT_THEME_NAME = "light";
const THEME_LOCAL_STORAGE_KEY = "book_store_theme";


interface State {
  themeName : ThemeName;
  toggleTheme : () => void;
}

export const state : State= {
  themeName : DEFAULT_THEME_NAME,
  toggleTheme : () => {
  }
}

export const ThemeContext = createContext<State>(state);

// BookStoreThemeProvider : 테마 관련 로직과 상태를 관리한다.
export const BookStoreThemeProvider = ({children} : {children : ReactNode}) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);
  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? "dark" : 'light');
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeName === 'light' ? "dark" : 'light' );
  }

  useEffect(() => {
    const savedThemeName = localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as ThemeName;
    setThemeName(savedThemeName || DEFAULT_THEME_NAME);
  },[]);
  
  return (
    <ThemeContext.Provider value = {{themeName, toggleTheme}}> {/* 테마 상태와 테마 전환 함수를 하위 컴포넌트에서 사용할 수 있도록 제공한다. */}
      <ThemeProvider theme={getTheme(themeName)}> {/* 하위애들한테 theme이라는 props를 전달해준다. */}
        <GlobalStyle/>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )

}