export function AppInput(props) {
  return (
    <div class="mb-3">
      <label for={props.id} class="form-label">
        {props.label}
      </label>
      <input
        id={props.id}
        class="form-control"
        onInput={props.onInput}
        type={props.type}
      />
      <span class="small text-danger">{props.help}</span>
    </div>
  );
}
