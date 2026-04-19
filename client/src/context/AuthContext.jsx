import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }

      if (storedToken) {
        setToken(storedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    } catch (err) {
      console.log("Auth init error:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);

    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);