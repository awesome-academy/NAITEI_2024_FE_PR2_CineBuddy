import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

interface User {
  userName: string;
  phoneNumber: string;
  email: string;
  passWord: string; 
}

const USERS_KEY = 'users';
const LOGGED_IN_USER_KEY = 'loggedInUser';
const REMEMBER_ME_USER_KEY = 'rememberMeUser';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('REACT_APP_SECRET_KEY is not set.');
}

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

// Verify 
export const verifyUserCredentials = (
  emailOrPhone: string,
  passWord: string
): User | null => {
  if (!emailOrPhone || !passWord) {
    return null;
  }

  const users = getUsersFromLocalStorage();
  const user = users.find(
    (user) => user.email === emailOrPhone || user.phoneNumber === emailOrPhone
  );

  if (user && user.passWord && bcrypt.compareSync(passWord, user.passWord)) {
    return user;
  }

  return null;
};

// Session storage
export const setLoggedInUserInSessionStorage = (user: User) => {
  sessionStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
};

// Remember Me
export const setLoggedInUserInCookies = (user: User) => {
  // Ma hoa
  const encryptedUserData = CryptoJS.AES.encrypt(JSON.stringify(user), SECRET_KEY).toString();

  // Luu vao cookies
  Cookies.set(REMEMBER_ME_USER_KEY, encryptedUserData, { expires: 7 });
};

export const getLoggedInUserFromSessionStorage = (): User | null => {
  const user = sessionStorage.getItem(LOGGED_IN_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const getLoggedInUserFromCookies = (): User | null => {
  const encryptedUserData = Cookies.get(REMEMBER_ME_USER_KEY);

  if (encryptedUserData) {
    try {
      // Giai ma
      const bytes = CryptoJS.AES.decrypt(encryptedUserData, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Failed to decrypt user data from cookies', error);
      return null;
    }
  }

  return null;
};
