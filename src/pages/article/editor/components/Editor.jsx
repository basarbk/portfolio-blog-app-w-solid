export function Editor() {
  return (
    <div class="bg-white border rounded p-3 d-flex flex-column flex-grow-1">
      <textarea
        style="resize:none"
        placeholder="New post title here"
        class="border-0 no-outline h1"
      />
      <textarea
        style="resize:none"
        placeholder="Write your post content here"
        class="flex-grow-1 border-0 no-outline"
      />
    </div>
  );
}
