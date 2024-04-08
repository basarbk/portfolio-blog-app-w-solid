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

  const setLoggedIn = (user) => {
    setAuth(user);
  };

  const setLoggedOut = () => {
    setAuth({ id: 0, name: null, email: null, handle: null, image: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setLoggedIn, setLoggedOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
