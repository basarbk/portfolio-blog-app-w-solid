import { ErrorBoundary, Suspense } from "solid-js";
import { AppAlert, AppSpinner } from "../../../components";
import { MoreArticles } from "./components/MoreArticles";
import { MainContent } from "./components/MainContent";

export function ArticleView() {
  return (
    <Suspense fallback={<AppSpinner full size="regular" />}>
      <ErrorBoundary
        fallback={(error) => (
          <AppAlert variant="danger">{error.message}</AppAlert>
        )}
      >
        <div class="row">
          <div class="col-lg-8">
            <MainContent />
          </div>
          <div class="col-lg-4 d-none d-lg-block">
            <Suspense fallback={<AppSpinner full size="regular" />}>
              <MoreArticles />
            </Suspense>
          </div>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}
