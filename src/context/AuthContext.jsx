import React, { useEffect } from "react";
import { login, sendData } from "../service/api";
export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  async function registerUser({ name, email, password }) {
    setLoading(true);
    setError(null);
    await sendData("user/register", { name, email, password }).then(
      (response) => {
        if (response.data) {
          console.log(response.data);
          return response.data;
        } else if (response?.error) {
          setError(response.error);
        }
      }
    );
    setLoading(false);
  }

  const loginUser = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    return await login("user/login", { email, password })
      .then((response) => {
        if (response && response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data);
          setUser(response.data);
          setError(undefined);
          return response.data;
        } else if (response && response?.error) {
          setError(response.error);
          return null;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem("user");
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, registerUser, error, loginUser, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
