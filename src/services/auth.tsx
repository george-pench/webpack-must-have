interface User {
  name: string;
  email: string;
  password: string;
}

export const registerUser = (userData: Omit<User, "name"> & { username: string }): Omit<User, "password"> => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const newUser: User = {
    name: userData.username,
    email: userData.email,
    password: userData.password,
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return { name: newUser.name, email: newUser.email };
};

export const loginUser = async (email: string, password: string): Promise<Omit<User, "password">> => {
  const users: User[] = await JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const { name, email: userEmail } = user;
    return { name, email: userEmail };
  }
  throw new Error("Invalid credentials");
};

export const getCurrentUser = (email: string): Omit<User, "password"> | null => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email);
  if (user) {
    const { name, email: userEmail } = user;
    return { name, email: userEmail };
  }
  return null;
};

export const updateUserProfile = async (
  currentEmail: string,
  updatedData: { name: string; email: string },
): Promise<Omit<User, "password">> => {
  const users: User[] = await JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((u) => u.email === currentEmail);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  users[userIndex] = { ...users[userIndex], ...updatedData };
  localStorage.setItem("users", JSON.stringify(users));

  const { name, email } = users[userIndex];
  return { name, email };
};
