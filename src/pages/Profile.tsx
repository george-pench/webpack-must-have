import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { updateUserProfile } from "../services/auth";
import * as styles from "./Profile.m.scss";

interface FormData {
  name: string;
  email: string;
}

function Profile(): React.ReactElement {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("User not authenticated");
      return;
    }

    try {
      const updatedUser = await updateUserProfile(user.email, formData);
      login(updatedUser);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  if (!user) {
    return <Typography>Please log in to view your profile.</Typography>;
  }

  return (
    <Box className={styles.profile}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      {error && (
        <Alert severity="error" className={styles.alert}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" className={styles.alert}>
          {success}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
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
        <Button type="submit" variant="contained" color="primary" fullWidth className={styles.submitButton}>
          Update Profile
        </Button>
      </form>
    </Box>
  );
}

export default Profile;
