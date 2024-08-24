import React, { useState } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import * as styles from "./SignIn.m.scss";
import { loginUser } from "../services/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      login({ name: user.name, email: user.email });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <div className={styles["sign-in"]}>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="sign-in-dialog-title">
        <DialogTitle id="sign-in-dialog-title">Sign In</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} className={styles["cancel-button"]}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" className={styles["submit-button"]}>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignIn;
