import { createSignal } from "solid-js";

export function ImageSelector(props) {
  const [error, setError] = createSignal();
  let refImageSelector;
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
        props.setImage(body.filename);
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
    <div class="d-flex align-items-center py-2 gap-2">
      <Show when={props.image}>
        <img
          class="img-thumbnail"
          width={200}
          src={`/api/assets/${props.image}`}
        />
      </Show>
      <div class="d-flex flex-column gap-2">
        <button
          class="btn btn-outline-success btn-sm"
          type="button"
          onClick={() => refImageSelector.click()}
        >
          Add Image
          <input
            ref={refImageSelector}
            type="file"
            hidden
            onChange={onSelectImage}
          />
        </button>
        <Show when={props.image}>
          <button
            class="btn btn-outline-danger btn-sm"
            type="button"
            onClick={[props.setImage, null]}
          >
            Delete Image
          </button>
        </Show>
      </div>
    </div>
  );
}
