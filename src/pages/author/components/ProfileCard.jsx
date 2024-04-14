import { useParams } from "@solidjs/router";
import { Show, createResource } from "solid-js";
import { AppImage } from "../../../components";
import { useAuth } from "../../../context/Auth";

const fetchUser = async (id) => {
  const result = await fetch(`/api/users/${id}`);
  const body = await result.json();
  if (result.status === 200) return body;
  throw new Error(body.message);
};

export function ProfileCard() {
  const params = useParams();
  const { auth } = useAuth();

  const [user] = createResource(() => params.handle, fetchUser);

  return (
    <div class="card text-center">
      <div class="card-header">
        <div class="m-auto" style="width:200px">
          <AppImage
            class="rounded-circle shadow-sm"
            image={user()?.image}
            fallback="profile"
          />
        </div>
      </div>
      <div class="card-body">
        <span class="h3">{`${user()?.name}@${user()?.handle}`}</span>
      </div>
      <Show when={auth.handle === params.handle}>
        <div class="card-footer">
          <a class="btn btn-primary" href="/edit">
            Edit
          </a>
        </div>
      </Show>
    </div>
  );
}
