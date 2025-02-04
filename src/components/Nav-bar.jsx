import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Logout from "@mui/icons-material/Logout";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1 className="navbarBrand">Chatty</h1>
      <h3 className="welcome">
        Welcome {user?.user?.name ? `${user?.user?.name}` : "to Chat App"}{" "}
      </h3>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        <li className="logout" onClick={logout}>
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
