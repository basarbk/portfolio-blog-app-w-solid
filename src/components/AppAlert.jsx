import { Show } from "solid-js";

export function AppAlert(props) {
  return (
    <Show when={props.children}>
      <div class={`alert alert-${props.variant ?? "success"}`} role="alert">
        {props.children}
      </div>
    </Show>
  );
}
