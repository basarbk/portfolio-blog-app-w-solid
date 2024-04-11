import { ErrorBoundary, Show, Suspense, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { ArticleEditor } from ".";
import { AppAlert, AppSpinner } from "../../../components";

const fetchArticle = async (id) => {
  const result = await fetch(`/api/articles/${id}`);
  const body = await result.json();
  if (result.status === 200) return body;
  throw new Error(body.message);
};

export function ArticleEditWrapper() {
  const params = useParams();

  const [article] = createResource(() => params.idOrSlug, fetchArticle);
  return (
    <Suspense fallback={<AppSpinner full size="regular" />}>
      <ErrorBoundary
        fallback={(error) => (
          <AppAlert variant="danger">{error.message}</AppAlert>
        )}
      >
        <Show when={article()}>
          <ArticleEditor article={article()} />
        </Show>
      </ErrorBoundary>
    </Suspense>
  );
}
