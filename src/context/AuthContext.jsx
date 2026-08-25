import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      return {
        id: 1,
        name: "Admin User",
        email: "admin@communityhub.com",
        role: "Admin",
        isLoggedIn: true,
      };
    }

    return null;
  });

  const login = () => {
    const loggedInUser = {
      id: 1,
      name: "Admin User",
      email: "admin@communityhub.com",
      role: "Admin",
      isLoggedIn: true,
    };

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}