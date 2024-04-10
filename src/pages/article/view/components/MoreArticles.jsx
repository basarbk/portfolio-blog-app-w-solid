import { useParams } from "@solidjs/router";
import { ErrorBoundary, For } from "solid-js";
import { createResource } from "solid-js";

const fetchArticlesOfUser = async (id) => {
  const result = await fetch(`/api/users/${id}/articles?size=3`);
  const body = await result.json();
  if (result.status === 200) return body;
  throw new Error(body.message);
};

export function MoreArticles() {
  const params = useParams();

  const [articles] = createResource(() => params.handle, fetchArticlesOfUser);

  return (
    <ErrorBoundary>
      <div class="bg-white border rounded p-3">
        <span class="fs-4 fw-bold">More articles from </span>
        <a
          class="text-capitalize fs-4 fw-bold text-decoration-none"
          href={`/${params.handle}`}
        >
          {articles()?.content[0].author.name}
        </a>
        <For each={articles()?.content}>
          {(article) => {
            return (
              <div class="border-top py-2">
                <a
                  class="text-decoration-none text-capitalize text-light-emphasis"
                  href={`/${params.handle}/${article.slug}`}
                >
                  {article.title}
                </a>
              </div>
            );
          }}
        </For>
      </div>
    </ErrorBoundary>
  );
}
