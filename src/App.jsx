import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Electrona from "./pages/electrona";
import Custom from "./pages/custom";
import "./globals.css";

const App = () => {
  const location = useLocation();

  return (
    <Electrona/>
  );
};

export default App;