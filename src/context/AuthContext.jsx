import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  isAuthenticated: false,
  user: {},
};
const FAKE_USER = {
  name: "Tawseef",
  email: "syedtawseef0@gmail.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: FAKE_USER };
    case "logout":
      return { ...state, isAuthenticated: false };
  }
}
function AuthProvider({ children }) {
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login" });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user } = state;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const value = useContext(AuthContext);
  if (value === undefined) throw new Error("useAuth called at wrong place");
  return value;
}
export { AuthProvider, useAuth };
