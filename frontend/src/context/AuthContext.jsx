import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const demoUser = {
  id: "demo-user",
  name: "Bani",
  email: "bani@example.com",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("subtrack_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("subtrack_user", JSON.stringify(user));
    else localStorage.removeItem("subtrack_user");
  }, [user]);

  const login = async (email, password) => {
    // Demo-only UI authentication. Replace with API call later.
    if (!email || !password) throw new Error("Email and password are required.");
    setUser({ ...demoUser, email });
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) throw new Error("All fields are required.");
    setUser({ id: "demo-user", name, email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}