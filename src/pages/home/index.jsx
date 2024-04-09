import { createStore } from "solid-js/store";
import { For, Show, onMount, onCleanup } from "solid-js";
import { AppButton } from "../../components";
export function Home() {
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

  onMount(() => {
    loadPageData();
    window.addEventListener("scroll", scrollListener);
  });

  onCleanup(() => {
    window.removeEventListener("scroll", scrollListener);
  });

  const loadPageData = async (pageIndex = 0) => {
    const result = await fetch(
      "/api/articles?" +
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
        {(article) => (
          <div class="card mb-3">
            <div class="card-body">
              <a
                class="text-decoration-none fs-3 text-dark"
                href={`/${article.author.handle}/${article.slug}`}
              >
                {article.title}
              </a>
            </div>
          </div>
        )}
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
