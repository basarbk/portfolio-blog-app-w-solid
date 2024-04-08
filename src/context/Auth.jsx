import { createContext, createEffect, useContext } from "solid-js";
import { createStore } from "solid-js/store";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  let initialState = { id: 0 };
  const storage = localStorage.getItem("auth");
  if (storage) {
    try {
      initialState = JSON.parse(storage);
    } catch {}
  }

  const [auth, setAuth] = createStore(initialState);

  createEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}
