
import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
//import Auth from './components/connection/Auth.js'
import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
