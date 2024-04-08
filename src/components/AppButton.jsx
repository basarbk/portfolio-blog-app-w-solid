import { AppSpinner } from "./AppSpinner";

export function AppButton(props) {
  return (
    <button
      disabled={props.disabled || props.loading}
      class={`btn btn-${props.variant ?? "primary"}`}
      onClick={props.onClick}
    >
      <Show when={props.loading}>
        <AppSpinner />
      </Show>
      {props.children}
    </button>
  );
}
