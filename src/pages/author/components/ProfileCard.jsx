import { useParams } from "@solidjs/router";
import { Show, createResource } from "solid-js";
import { AppImage } from "../../../components";

const fetchUser = async (id) => {
  const result = await fetch(`/api/users/${id}`);
  const body = await result.json();
  if (result.status === 200) return body;
  throw new Error(body.message);
};

export function ProfileCard() {
  const params = useParams();

  const [user] = createResource(() => params.handle, fetchUser);

  return (
    <div class="card text-center">
      <div class="card-header">
        <div class="m-auto" style="width:200px">
          <Show when={user()}>
            <AppImage
              class="rounded-circle shadow-sm"
              image={user().image}
              fallback="profile"
            />
          </Show>
        </div>
      </div>
      <div class="card-body">
        <span class="h3">{`${user()?.name}@${user()?.handle}`}</span>
      </div>
    </div>
  );
}
