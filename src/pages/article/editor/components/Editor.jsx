export function Editor(props) {
  return (
    <div class="bg-white border rounded p-3 d-flex flex-column flex-grow-1">
      <textarea
        style="resize:none"
        placeholder="New post title here"
        class="no-outline h1"
        rows={1}
        classList={{
          "border-0": !props.errors.title,
          "editor-error": props.errors.title,
        }}
        required
        onInput={(event) => props.setTitle(event.target.value)}
      />
      <span class="text-danger small">{props.errors.title}</span>
      <textarea
        style="resize:none"
        placeholder="Write your post content here"
        class="flex-grow-1 no-outline"
        classList={{
          "border-0": !props.errors.content,
          "editor-error": props.errors.content,
        }}
        required
        onInput={(event) => props.setContent(event.target.value)}
      />
      <span class="text-danger small">{props.errors.content}</span>
    </div>
  );
}
