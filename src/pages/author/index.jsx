import { ErrorBoundary, Suspense } from "solid-js";
import { AppAlert, AppSpinner, Feed } from "../../components";
import { useParams } from "@solidjs/router";
import { ProfileCard } from "./components/ProfileCard";

export function Author() {
  const params = useParams();
  return (
    <Suspense fallback={<AppSpinner full size="regular" />}>
      <ErrorBoundary
        fallback={<AppAlert variant="danger">User not found</AppAlert>}
      >
        <div class="d-flex flex-column gap-2">
          <ProfileCard />
          <Feed handle={params.handle} />
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}
