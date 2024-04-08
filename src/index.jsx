/* @refresh reload */
import { render } from "solid-js/web";
import "./assets/styles.scss";
import App from "./App";
import { Router, Route } from "@solidjs/router";
import { Home } from "./pages/home";
import { SignUp } from "./pages/sign-up";
import { Callback } from "./pages/callback";
import { AuthProvider } from "./context/Auth";
import { Login } from "./pages/login";
import { ArticleEditor } from "./pages/article";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <AuthProvider>
      <Router root={App}>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/callback" component={Callback} />
        <Route path="/article/new" component={ArticleEditor} />
      </Router>
    </AuthProvider>
  ),
  root
);
