import { AppButton } from "../../../components";
import { Editor } from "./components/Editor";
import { Show, createSignal } from "solid-js";

export function ArticleEditor() {
  const [title, setTitle] = createSignal();
  const [content, setContent] = createSignal();
  const [id, setId] = createSignal(0);
  const [published, setPublished] = createSignal(false);
  const [saveProgress, setSaveProgress] = createSignal(false);
  const [publishProgress, setPublishProgress] = createSignal(false);

  const saveArticle = async () => {
    setSaveProgress(true);
    try {
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
    } catch {
    } finally {
      setSaveProgress(false);
    }
  };

  const togglePublish = async () => {
    setPublishProgress(true);
    try {
      const response = await fetch(`/api/articles/${id()}/publish`, {
        method: "PATCH",
      });
      if (response.status === 200) {
        setPublished((previous) => !previous);
      }
    } catch {
    } finally {
      setPublishProgress(false);
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
            loading={publishProgress()}
          >
            {published() ? "Unpublish" : "Publish"}
          </AppButton>
        </Show>
        <AppButton
          variant="success"
          onClick={saveArticle}
          loading={saveProgress()}
        >
          {id() ? "Update" : "Save"}
        </AppButton>
      </div>
    </div>
  );
}
