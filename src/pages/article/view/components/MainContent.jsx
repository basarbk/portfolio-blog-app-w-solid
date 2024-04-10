import { Show, createResource } from "solid-js";
import { useIsRouting, useParams } from "@solidjs/router";
import { ArticleInfo } from "../../../../components/ArticleInfo";

const fetchArticle = async (id) => {
  const result = await fetch(`/api/articles/${id}`);
  const body = await result.json();
  if (result.status === 200) return body;
  throw new Error(body.message);
};

export function MainContent() {
  const params = useParams();
  const isRouting = useIsRouting();

  const [article] = createResource(() => params.idOrSlug, fetchArticle);
  return (
    <div class="placeholder-glow">
      <div
        classList={{
          "placeholder rounded w-100": isRouting(),
        }}
      >
        <main class="bg-white border rounded py-3 px-5">
          <Show when={article()}>
            <ArticleInfo
              author={article().author}
              publishedAt={article().publishedAt}
            />
          </Show>
          <h1 class="text-capitalize">{article()?.title}</h1>
          <div>{article()?.content}</div>
        </main>
      </div>
    </div>
  );
}
