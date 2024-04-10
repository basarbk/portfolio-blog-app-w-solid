import { Match, Switch } from "solid-js";
import defaultProfileImage from "../assets/profile.png";
import { format } from "timeago.js";

export function ArticleInfo(props) {
  return (
    <div class="d-flex align-items-center gap-3 mb-1">
      <a href={`/${props.author.handle}`}>
        <img
          class="rounded-circle shadow-sm"
          src={defaultProfileImage}
          width={30}
          height={30}
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
