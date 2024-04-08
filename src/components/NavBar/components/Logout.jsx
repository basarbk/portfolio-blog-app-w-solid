import { useAuth } from "../../../context/Auth";

export function Logout() {
  const { setLoggedOut } = useAuth();
  const onClick = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setLoggedOut();
    } catch {}
  };
  return (
    <a class="nav-link active" href="#" onClick={onClick}>
      Logout
    </a>
  );
}
