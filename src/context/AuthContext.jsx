
import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_URL = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      sessionStorage.removeItem("user");
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const saveSession = useCallback((token, userData) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  // Restore and verify the session with the backend.
  const refreshUser = useCallback(async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data.user;
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return userData;
    } catch {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setUser(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      saveSession(response.data.token, response.data.user);
      return response.data.user;
    },
    [saveSession]
  );

  const register = useCallback(
    async (name, email, password) => {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });

      // Registration creates the account. The Register page can
      // redirect to Login rather than automatically signing in.
      return response.data;
    },
    []
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
