import { createSignal } from "solid-js";
import { AppButton } from "../../../components";

export function PublishButton(props) {
  const [published, setPublished] = createSignal(props.published);
  const [apiProgress, setApiProgress] = createSignal(false);

  const togglePublish = async () => {
    props.setError?.();
    setApiProgress(true);
    try {
      const response = await fetch(`/api/articles/${props.id}/publish`, {
        method: "PATCH",
      });
      if (response.status === 200) {
        const publishedAt = published() ? null : new Date();
        setPublished((previous) => !previous);
        props.setPublishedAt?.(publishedAt);
      }
    } catch {
      props.setError?.("Unexpected error occured, please try again");
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <AppButton
      onClick={togglePublish}
      variant={published() ? "secondary" : "primary"}
      loading={apiProgress()}
    >
      {published() ? "Unpublish" : "Publish"}
    </AppButton>
  );
}
