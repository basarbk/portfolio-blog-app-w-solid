import { Match, Switch } from "solid-js";
import { format } from "timeago.js";
import { AppImage } from "./AppImage";

export function ArticleInfo(props) {
  return (
    <div class="d-flex align-items-center gap-3 mb-1">
      <a href={`/${props.author.handle}`}>
        <AppImage
          class="rounded-circle shadow-sm"
          image={props.author.image}
          width={30}
          height={30}
          fallback="profile"
        />
      </a>
      <div class="d-flex flex-column">
        <a
          class="text-decoration-none text-capitalize fw-bold link-dark"
          href={`/${props.author.handle}`}
        >
          {props.author.name}
        </a>
        <Switch>
          <Match when={props.publishedAt}>
            <small class="fw-light">
              Published at {format(props.publishedAt)}
            </small>
          </Match>
          <Match when={!props.publishedAt}>
            <small class="fw-light text-bg-danger">
              <em>Unpublished</em>
            </small>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
