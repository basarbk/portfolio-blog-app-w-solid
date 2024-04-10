import { Feed } from "../../components";
import { useParams } from "@solidjs/router";

export function Author() {
  const params = useParams();
  return <Feed handle={params.handle} />;
}
