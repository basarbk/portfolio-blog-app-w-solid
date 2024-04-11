import { AppButton, AppToast } from "../../../components";
import { Editor } from "./components/Editor";
import { Show, createEffect, createSignal, on } from "solid-js";

export function ArticleEditor(props) {
  const [title, setTitle] = createSignal(props.article?.title ?? "");
  const [content, setContent] = createSignal(props.article?.content ?? "");
  const [id, setId] = createSignal(props.article?.id ?? 0);
  const [published, setPublished] = createSignal(
    props.article?.published ?? false
  );
  const [saveProgress, setSaveProgress] = createSignal(false);
  const [publishProgress, setPublishProgress] = createSignal(false);
  const [errors, setErrors] = createSignal({});
  const [error, setError] = createSignal();

  createEffect(
    on(title, () => {
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          title: undefined,
        };
      });
    })
  );

  createEffect(
    on(content, () => {
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          content: undefined,
        };
      });
    })
  );

  const saveArticle = async (event) => {
    event.preventDefault();
    setError();
    const form = event.target;
    if (!form.checkValidity()) {
      const errors = {
        title: undefined,
        content: undefined,
      };
      const [titleTextArea, contentTextArea] =
        form.querySelectorAll("textarea");
      if (!titleTextArea.checkValidity()) {
        errors.title = "Title is required";
      }
      if (!contentTextArea.checkValidity()) {
        errors.content = "Content is required";
      }
      setErrors(errors);
      return;
    }

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
      } else if (response.status === 400) {
        setErrors(body.validationErrors);
      }
    } catch {
      setError("Unexpected error occured, please try again");
    } finally {
      setSaveProgress(false);
    }
  };

  const togglePublish = async () => {
    setError();
    setPublishProgress(true);
    try {
      const response = await fetch(`/api/articles/${id()}/publish`, {
        method: "PATCH",
      });
      if (response.status === 200) {
        setPublished((previous) => !previous);
      }
    } catch {
      setError("Unexpected error occured, please try again");
    } finally {
      setPublishProgress(false);
    }
  };

  return (
    <>
      <form onSubmit={saveArticle} noValidate>
        <div class="d-flex flex-column editor-base">
          <Editor
            title={title()}
            setTitle={setTitle}
            content={content()}
            setContent={setContent}
            errors={errors()}
          />
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
            <AppButton variant="success" loading={saveProgress()} type="submit">
              {id() ? "Update" : "Save"}
            </AppButton>
          </div>
        </div>
      </form>
      <AppToast message={error()} />
    </>
  );
}
