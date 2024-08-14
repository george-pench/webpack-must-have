import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import * as styles from "./Header.m.scss";

function Header(): React.ReactElement {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuth = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.logo}>
          React
        </Typography>
        <div className={styles.rightSection}>
          <nav className={styles.nav}>
            <Button color="inherit" href="/" className={styles.navLink}>
              Home
            </Button>
            <Button color="inherit" href="/contact" className={styles.navLink}>
              Contact
            </Button>
            <Button color="inherit" href="/about" className={styles.navLink}>
              About
            </Button>
          </nav>
          <div className={styles.userActions}>
            {user ? (
              <Button color="inherit" onClick={logout} className={styles.authButton}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={() => handleAuth("/signin")} className={styles.authButton}>
                  Sign In
                </Button>
                <Button color="inherit" onClick={() => handleAuth("/signup")} className={styles.authButton}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
