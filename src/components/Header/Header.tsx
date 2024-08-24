import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

function Header(): React.ReactElement {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Your App Name
          </Link>
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
