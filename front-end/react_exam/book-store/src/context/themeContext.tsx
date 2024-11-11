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
    <ThemeContext.Provider value = {{themeName, toggleTheme}}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName}/>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )

}