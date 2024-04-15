import { createSignal } from "solid-js";

export function ReactionButton(props) {
  const [reacted, setReacted] = createSignal(false);
  const onClick = async () => {
    try {
      const result = await fetch("/api/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entityType: "article",
          entityId: props.entityId,
          category: "readingList",
        }),
      });
      if (result.status === 201) {
        setReacted((previous) => !previous);
      }
    } catch {}
  };

  return (
    <div
      onClick={onClick}
      style={
        reacted()
          ? `font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24`
          : ""
      }
    >
      <span class="material-symbols-outlined action">bookmark</span>
    </div>
  );
}
