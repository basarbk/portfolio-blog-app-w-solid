import { Match, Switch } from "solid-js";
import { useAuth } from "../../context/Auth";

export function NavBar() {
  const auth = useAuth();
  console.log(auth);
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
                <a class="nav-link active" href="/signup">
                  Sign Up
                </a>
              </li>
            </Match>
            <Match when={auth.id !== 0}>
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  Logout
                </a>
              </li>
            </Match>
          </Switch>
        </ul>
      </div>
    </nav>
  );
}
