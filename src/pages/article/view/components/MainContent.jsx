import { Show, createResource } from "solid-js";
import { useIsRouting, useParams } from "@solidjs/router";
import { ArticleInfo } from "../../../../components/ArticleInfo";
import { useAuth } from "../../../../context/Auth";
import { PublishButton } from "../../components/PublishButton";

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

  const [article, { mutate }] = createResource(
    () => params.idOrSlug,
    fetchArticle
  );

  const setPublishedAt = (publishedAt) => {
    mutate((article) => {
      return {
        ...article,
        publishedAt,
      };
    });
  };

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
              <div class="d-flex gap-2">
                <a
                  class="btn btn-warning icon-link"
                  href={`/${article()?.author?.handle}/${params.idOrSlug}/edit`}
                >
                  <span class="material-symbols-outlined">edit</span>
                  Edit
                </a>
                <PublishButton
                  id={article()?.id}
                  published={article()?.published}
                  setPublishedAt={setPublishedAt}
                />
              </div>
            </Show>
          </div>

          <h1 class="text-capitalize">{article()?.title}</h1>
          <div>{article()?.content}</div>
        </main>
      </div>
    </div>
  );
}
