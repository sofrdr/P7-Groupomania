
import React  from 'react';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';

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
