import { splitProps } from "solid-js";

export function AppInput(props) {
  const [options, attributes] = splitProps(props, ["id", "label", "help"]);
  return (
    <div class="mb-3">
      <label for={options.id} class="form-label">
        {options.label}
      </label>
      <input id={props.id} class="form-control" {...attributes} />
      <span class="small text-danger">{options.help}</span>
    </div>
  );
}
