import { ErrorBoundary, Suspense, createResource } from "solid-js";
import { useIsRouting, useParams } from "@solidjs/router";
import { AppAlert, AppSpinner } from "../../../components";

const fetchArticle = async (id) => {
  const result = await fetch(`/api/articles/${id}`);
  const body = await result.json();
  if (result.status === 200) return body;
  throw new Error(body.message);
};

export function ArticleView() {
  const params = useParams();
  const isRouting = useIsRouting();

  const [article] = createResource(() => params.idOrSlug, fetchArticle);

  return (
    <Suspense fallback={<AppSpinner full size="regular" />}>
      <ErrorBoundary
        fallback={(error) => (
          <AppAlert variant="danger">{error.message}</AppAlert>
        )}
      >
        <div class="placeholder-glow">
          <div
            classList={{
              "placeholder rounded w-100": isRouting(),
            }}
          >
            <main class="bg-white border rounded py-3 px-5">
              <h1 class="text-capitalize">{article()?.title}</h1>
              <div>{article()?.content}</div>
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}
