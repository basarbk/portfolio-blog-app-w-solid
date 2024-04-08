import { AppButton } from "../../../components";
import { Editor } from "./components/Editor";

export function ArticleEditor() {
  return (
    <div class="d-flex flex-column editor-base">
      <Editor />
      <div class="py-3 px-2 d-flex gap-2">
        <AppButton>Publish</AppButton>
        <AppButton variant="success">Save</AppButton>
      </div>
    </div>
  );
}
