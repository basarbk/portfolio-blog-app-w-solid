export function AppButton(props) {
  return (
    <button
      disabled={props.disabled || props.loading}
      class={`btn btn-${props.variant ?? "primary"}`}
    >
      <Show when={props.loading}>
        <span
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
      </Show>
      {props.children}
    </button>
  );
}
