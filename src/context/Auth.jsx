import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [auth, setAuth] = createStore({ id: 0 });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}
