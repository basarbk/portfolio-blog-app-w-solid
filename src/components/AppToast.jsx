import { createEffect, createSignal } from "solid-js";
export function AppToast(props) {
  const [show, setShow] = createSignal(false);
  createEffect(() => {
    if (props.message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  });
  return (
    <div
      class="toast-wrapper position-fixed"
      style={{
        opacity: props.message && show() ? 1 : 0,
      }}
    >
      <div
        class="toast text-bg-danger border-0 show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-body">{props.message}</div>
      </div>
    </div>
  );
}
