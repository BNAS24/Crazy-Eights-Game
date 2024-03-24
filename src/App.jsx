import React from "react";
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { appStyles } from './styles/main_app/jscript_styles';
import { GameContainer } from './pages/gamepage/GameContainer';
import { HomePageContainer } from './pages/homepage/HomePageContainer';
import { darkModeTheme, lightModeTheme } from "./styles/themes/mui_theme";

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? lightModeTheme : darkModeTheme}>
      <Button
        variant='contained'
        disableElevation
        onClick={toggleDarkMode}
        sx={{
          ...appStyles.themeButton
        }}
      >
        theme mode
      </Button>
      <Routes>
        <Route path='/' element={<HomePageContainer />} />
        <Route path='/game' element={< GameContainer />} />
      </Routes>
    </ThemeProvider>
  );
};
