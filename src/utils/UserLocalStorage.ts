import bcrypt from 'bcryptjs';

interface User {
  userName: string;
  phoneNumber: string;
  email: string;
  passWord: string; 
}

const USERS_KEY = 'users';

// Save vao local storage
export const saveUserToLocalStorage = (user: User) => {
  const existingUsers = getUsersFromLocalStorage();
  existingUsers.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(existingUsers));
};

// Lay user tu local storage
export const getUsersFromLocalStorage = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};
