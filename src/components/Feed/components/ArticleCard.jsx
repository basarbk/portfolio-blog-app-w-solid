import { ArticleInfo } from "../../ArticleInfo";

export function ArticleCard(props) {
  return (
    <div class="card mb-3">
      <div class="card-body">
        <ArticleInfo
          author={props.article.author}
          publishedAt={props.article.publishedAt}
        />
        <a
          class="text-decoration-none fs-3 text-dark"
          href={`/${props.article.author.handle}/${props.article.slug}`}
        >
          {props.article.title}
        </a>
      </div>
    </div>
  );
}
