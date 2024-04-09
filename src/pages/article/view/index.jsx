import { Match, Switch, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { AppAlert, AppSpinner } from "../../../components";

const fetchArticle = async (id) => {
  const result = await fetch(`/api/articles/${id}`);
  const body = await result.json();
  if (result.status === 200) return body;
  throw new Error(body.message);
};

export function ArticleView() {
  const params = useParams();

  const [article] = createResource(() => params.idOrSlug, fetchArticle);

  return (
    <Switch>
      <Match when={article.loading}>
        <AppSpinner full size="regular" />
      </Match>
      <Match when={article.error}>
        <AppAlert variant="danger">{article.error.message}</AppAlert>
      </Match>
      <Match when={article()}>
        <main class="bg-white border rounded py-3 px-5">
          <h1 class="text-capitalize">{article().title}</h1>
          <div>{article().content}</div>
        </main>
      </Match>
    </Switch>
  );
}
