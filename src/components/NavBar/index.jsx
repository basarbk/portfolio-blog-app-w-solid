import { Match, Switch } from "solid-js";
import { useAuth } from "../../context/Auth";
import { Logout } from "./components/Logout";
import { User } from "./components/User";

export function NavBar() {
  const { auth } = useAuth();
  return (
    <nav class="navbar navbar-expand bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand icon-link" href="/">
          <span class="material-symbols-outlined">edit_square</span>
          My App
        </a>
        <ul class="navbar-nav">
          <Switch>
            <Match when={auth.id === 0}>
              <li class="nav-item">
                <a class="nav-link active" href="/login">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="/signup">
                  Sign Up
                </a>
              </li>
            </Match>
            <Match when={auth.id !== 0}>
              <li class="nav-item">
                <a class="nav-link active" href="/article/new">
                  Post Article
                </a>
              </li>
              <li class="nav-item">
                <User />
              </li>
            </Match>
          </Switch>
        </ul>
      </div>
    </nav>
  );
}
