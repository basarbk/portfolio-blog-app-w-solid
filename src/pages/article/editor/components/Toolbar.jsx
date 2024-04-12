import { For } from "solid-js";

const actions = [
  {
    syntax: "**",
    icon: "format_bold",
  },
  {
    icon: "format_italic",
    syntax: "*",
  },
  {
    icon: "strikethrough_s",
    syntax: "~~",
  },
  {
    icon: "code",
    syntax: "```",
  },
];

export function Toolbar(props) {
  const onClick = (syntax) => {
    const textInput = props.textInput();
    const start = textInput.selectionStart;
    const end = textInput.selectionEnd;

    let selectedText = textInput.value.substring(start, end);
    selectedText = syntax + selectedText + syntax;
    textInput.setRangeText(selectedText, start, end);
    props.setContent(textInput.value);
  };

  return (
    <div class="bg-dark-subtle border rounded p-2 d-flex gap-2">
      <For each={actions}>
        {(action) => {
          return (
            <button
              class="btn btn-outline-dark btn-sm icon-link"
              type="button"
              onClick={[onClick, action.syntax]}
            >
              <span class="material-symbols-outlined">{action.icon}</span>
            </button>
          );
        }}
      </For>
    </div>
  );
}
