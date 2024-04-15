import { createSignal } from "solid-js";

const reactions = {
  like: {
    icon: "favorite",
    color: "red",
  },
  readingList: {
    icon: "bookmark",
    color: "var(--bs-primary)",
  },
  hot: {
    icon: "local_fire_department",
    color: "orange",
  },
};

export function ReactionButton(props) {
  const [reacted, setReacted] = createSignal(props.details.reacted);
  const [count, setCount] = createSignal(props.details.count);
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
          category: props.reaction,
        }),
      });
      if (result.status === 201) {
        const body = await result.json();
        if (body.result) {
          setCount((previousCount) => previousCount + 1);
        } else {
          setCount((previousCount) => previousCount - 1);
        }
        setReacted(body.result);
      }
    } catch {}
  };

  return (
    <div
      class="icon-link"
      onClick={onClick}
      style={
        reacted()
          ? `font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
    color:${reactions[props.reaction].color}
    `
          : ""
      }
    >
      <span class="material-symbols-outlined action">
        {reactions[props.reaction].icon}
      </span>
      <span class="text-black">{count()}</span>
    </div>
  );
}
