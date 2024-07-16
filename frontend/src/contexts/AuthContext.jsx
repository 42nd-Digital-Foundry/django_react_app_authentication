import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const baseUrl = "http://localhost:8000/auth/";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(baseUrl + "user/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("User not authenticated", error);
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(baseUrl + "login/", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access);
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async (email, firstName, lastName, password) => {
    try {
      await axios.post(baseUrl + "register/", {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
