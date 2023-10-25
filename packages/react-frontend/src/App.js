import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Navbar from './components/Navbar';
import Account from './pages/account';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Post from './pages/post';


function MyApp() {

  return (
    <Router>
      <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/login;' element={<Login />} /> */}
            <Route path='/post' element={<Post />} />
            <Route path='/home' element={<Home />} />
            <Route path='/account' element={<Account />} />

            {/* <Route path='/signup' element={<Signup />} /> */}
        </Routes>
      
    </Router>

  )
}


export default MyApp;
