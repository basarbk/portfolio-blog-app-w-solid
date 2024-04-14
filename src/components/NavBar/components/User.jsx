import { useAuth } from "../../../context/Auth";
import { AppImage } from "../../AppImage";

export function User() {
  const { auth } = useAuth();
  return (
    <a class="nav-link active" href={`/${auth.handle}`}>
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
  );
}
