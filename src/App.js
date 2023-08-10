// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route
            path="/auth"
            element={
              localStorage.getItem("currentUser") != null ? (
                <Home /> // Burayı değiştirin
              ) : (
                <Auth />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;