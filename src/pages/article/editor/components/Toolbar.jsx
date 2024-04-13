import { For, createSignal } from "solid-js";
import { AppToast } from "../../../../components";

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
  let refImageSelector;
  const [error, setError] = createSignal();

  const onClick = (syntax) => {
    const textInput = props.textInput();
    const start = textInput.selectionStart;
    const end = textInput.selectionEnd;

    let selectedText = textInput.value.substring(start, end);
    selectedText = syntax + selectedText + syntax;
    textInput.setRangeText(selectedText, start, end);
    props.setContent(textInput.value);
  };

  const onSelectImage = async (event) => {
    setError();
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    try {
      const result = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });
      const body = await result.json();
      if (result.status === 201) {
        const imageText = `![image alt text](/api/assets/${body.filename})`;
        const textInput = props.textInput();
        textInput.setRangeText(imageText);
        props.setContent(textInput.value);
      } else if (result.status === 400) {
        setError(body.validationErrors.file);
      } else {
        setError(body.message);
      }
    } catch {
      setError("Unexpected error occured, please try again");
    }
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
      <button
        class="btn btn-outline-dark btn-sm icon-link"
        type="button"
        onClick={() => refImageSelector.click()}
      >
        <span class="material-symbols-outlined">image</span>
        <input
          ref={refImageSelector}
          type="file"
          hidden
          onChange={onSelectImage}
        />
      </button>
      <AppToast message={error()} />
    </div>
  );
}
