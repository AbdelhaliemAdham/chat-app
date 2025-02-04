import React, { useContext } from "react";

import { Navbar, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Logout from "@mui/icons-material/Logout";

function NavarCom() {
  const { logout, user } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark" className="p-1">
      <Container>
        <Navbar.Brand>
          <Link to={"/"} className="text-decoration-none">
            Chat App
          </Link>
        </Navbar.Brand>
        {user?.user?.name && (
          <Navbar.Brand style={{ fontFamily: "cursive", fontWeight: "bold" }}>
            {user?.user?.name}
          </Navbar.Brand>
        )}
        <Stack direction="horizontal" gap={2}>
          <Navbar.Brand>
            <Link to={"/"} className="text-decoration-none color-white">
              Home
            </Link>
          </Navbar.Brand>
          {!user && (
            <>
              <Navbar.Brand>
                <Link to={"/login"} className="text-decoration-none">
                  Login
                </Link>
              </Navbar.Brand>
              <Navbar.Brand>
                <Link to={"/register"} className="text-decoration-none">
                  Register
                </Link>
              </Navbar.Brand>
            </>
          )}

          {user && (
            <Navbar.Brand
              style={{ cursor: "pointer" }}
              onClick={() => logout()}
            >
              <span style={{ color: "blue" }}>
                Logout <Logout />
              </span>
            </Navbar.Brand>
          )}
        </Stack>
      </Container>
    </Navbar>
  );
}

export default NavarCom;
