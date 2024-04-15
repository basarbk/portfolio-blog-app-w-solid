import { AppImage } from "../../AppImage";
import { ArticleInfo } from "../../ArticleInfo";
import { ReactionButton } from "../../ReactionButton";

export function ArticleCard(props) {
  return (
    <div class="card mb-3" style="max-height:150px">
      <div class="row">
        <div class="col-4">
          <AppImage
            image={props.article.image}
            class="rounded-start"
            height="148"
          />
        </div>
        <div class="card-body col-8 text-truncate">
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
          <ReactionButton entityId={props.article.id} />
        </div>
      </div>
    </div>
  );
}
