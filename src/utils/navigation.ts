import { NavigateFunction } from "react-router-dom";
import {
  getLoggedInUserFromLocalStorage,
  clearLoggedInUserFromLocalStorage,
} from "./UserLocalStorage.ts";

export const handleNavigate = (navigate: NavigateFunction, route: string) => {
  const user = getLoggedInUserFromLocalStorage();
  if (!user) {
    navigate("/login"); 
  } else {
    navigate(route); 
  }
};

// Log out
export const handleLogout = (navigate: NavigateFunction, setUser: (user: null) => void) => {
  clearLoggedInUserFromLocalStorage(); 
  setUser(null); 
  navigate("/login"); 
};

// Redirect to account-info
export const handleAccountInfoClick = (navigate: NavigateFunction) => {
  navigate("/account-info");
};
