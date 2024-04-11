import { Show, createResource } from "solid-js";
import { useIsRouting, useParams } from "@solidjs/router";
import { ArticleInfo } from "../../../../components/ArticleInfo";
import { useAuth } from "../../../../context/Auth";

const fetchArticle = async (id) => {
  const result = await fetch(`/api/articles/${id}`);
  const body = await result.json();
  if (result.status === 200) return body;
  throw new Error(body.message);
};

export function MainContent() {
  const params = useParams();
  const isRouting = useIsRouting();
  const { auth } = useAuth();

  const [article] = createResource(() => params.idOrSlug, fetchArticle);
  return (
    <div class="placeholder-glow">
      <div
        classList={{
          "placeholder rounded w-100": isRouting(),
        }}
      >
        <main class="bg-white border rounded py-3 px-5">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <Show when={article()}>
                <ArticleInfo
                  author={article().author}
                  publishedAt={article().publishedAt}
                />
              </Show>
            </div>
            <Show when={article()?.author?.handle === auth.handle}>
              <a
                class="btn btn-warning icon-link"
                href={`/${article()?.author?.handle}/${params.idOrSlug}/edit`}
              >
                <span class="material-symbols-outlined">edit</span>
                Edit
              </a>
            </Show>
          </div>

          <h1 class="text-capitalize">{article()?.title}</h1>
          <div>{article()?.content}</div>
        </main>
      </div>
    </div>
  );
}
