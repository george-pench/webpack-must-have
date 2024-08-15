import React, { useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as styles from "./SignUp.m.scss";
import { registerUser } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";

function SignUp(): React.ReactElement {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const user = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
      login({ name: user.name, email: user.email });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.signUp}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Sign Up
      </Typography>
      {error && (
        <Alert severity="error" className={styles.alert}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" className={styles.alert}>
          Sign up successful!
        </Alert>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth className={styles.submitButton}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
