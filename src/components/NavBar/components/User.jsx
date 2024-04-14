import { createSignal, onCleanup, onMount } from "solid-js";
import { useAuth } from "../../../context/Auth";
import { AppImage } from "../../AppImage";
import { Logout } from "./Logout";

export function User() {
  const { auth } = useAuth();
  const [show, setShow] = createSignal(false);
  let dropdownRef;

  const handleClick = (event) => {
    if (show() && !dropdownRef.contains(event.target)) {
      setShow(false);
    }
  };

  onMount(() => {
    window.addEventListener("click", handleClick);
  });

  onCleanup(() => {
    window.removeEventListener("click", handleClick);
  });
  return (
    <div ref={dropdownRef} class="dropdown">
      <a
        class="nav-link active"
        href="#"
        onClick={() => setShow((previousValue) => !previousValue)}
      >
        <div class="d-flex align-items-center gap-2">
          <div style="width=30px">
            <AppImage
              image={auth.image}
              fallback="profile"
              class="rounded-circle shadow-sm"
              width="30"
              height="30"
            />
          </div>
          {auth.name}
        </div>
      </a>
      <ul class="dropdown-menu end-0" classList={{ show: show() }}>
        <li>
          <a class="dropdown-item" href={`/${auth.handle}`}>
            Profile
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="/edit">
            Edit
          </a>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
}
