import { AppButton } from "../../../components";
import { Editor } from "./components/Editor";
import { Show, createSignal } from "solid-js";

export function ArticleEditor() {
  const [title, setTitle] = createSignal();
  const [content, setContent] = createSignal();
  const [id, setId] = createSignal();
  const [published, setPublished] = createSignal(false);

  const saveArticle = async () => {
    const url = id() ? `/api/articles/${id()}` : "/api/articles";
    const response = await fetch(url, {
      method: id() ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title(),
        content: content(),
      }),
    });
    const body = await response.json();
    if (response.status === 201) {
      setId(body.id);
    }
  };

  const togglePublish = async () => {
    const response = await fetch(`/api/articles/${id()}/publish`, {
      method: "PATCH",
    });
    if (response.status === 200) {
      setPublished((previous) => !previous);
    }
  };

  return (
    <div class="d-flex flex-column editor-base">
      <Editor setTitle={setTitle} setContent={setContent} />
      <div class="py-3 px-2 d-flex gap-2">
        <Show when={id()}>
          <AppButton
            onClick={togglePublish}
            variant={published() ? "secondary" : "primary"}
          >
            {published() ? "Unpublish" : "Publish"}
          </AppButton>
        </Show>
        <AppButton variant="success" onClick={saveArticle}>
          {id() ? "Update" : "Save"}
        </AppButton>
      </div>
    </div>
  );
}
