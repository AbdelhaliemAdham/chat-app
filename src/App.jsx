import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./context/AuthContext";
import React from "react";
import ChatProvider from "./context/ChatContext";
import Navbar from "./components/Nav-bar";

function App() {
  const { user } = React.useContext(AuthContext);
  return (
    <ChatProvider user={user}>
      {user && <Navbar />}
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route index element={user ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </ChatProvider>
  );
}

export default App;
