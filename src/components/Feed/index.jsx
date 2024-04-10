import { createStore } from "solid-js/store";
import { For, Show, onMount, onCleanup, createEffect, on } from "solid-js";
import { AppButton } from "../AppButton";
import { ArticleCard } from "./components/ArticleCard";

export function Feed(props) {
  const [data, setData] = createStore({
    content: [],
    page: 0,
    size: 10,
    total: 0,
  });

  const scrollListener = () => {
    if (data.page >= data.total - 1) return;
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      loadPageData(data.page + 1);
    }
  };

  createEffect(
    on(
      () => props.handle,
      () => {
        setData("content", []);
        setData("page", 0);
        setData("total", 0);
        loadPageData();
      }
    )
  );

  onMount(() => {
    window.addEventListener("scroll", scrollListener);
  });

  onCleanup(() => {
    window.removeEventListener("scroll", scrollListener);
  });

  const loadPageData = async (pageIndex = 0) => {
    const url = props.handle
      ? `/api/users/${props.handle}/articles?`
      : "/api/articles?";
    const result = await fetch(
      url +
        new URLSearchParams({
          size: data.size,
          page: pageIndex,
          sort: "published_at",
          direction: "desc",
        })
    );
    const body = await result.json();
    if (result.status === 200) {
      setData("content", (previousContent) => {
        return [...previousContent, ...body.content];
      });
      setData("page", pageIndex);
      setData("total", body.total);
    }
  };

  return (
    <div>
      <For each={data.content} fallback={<span>No items</span>}>
        {(article) => <ArticleCard article={article} />}
      </For>
      <Show when={data.page < data.total - 1}>
        <AppButton
          variant="outline-secondary"
          onClick={[loadPageData, data.page + 1]}
        >
          Load More
        </AppButton>
      </Show>
    </div>
  );
}
