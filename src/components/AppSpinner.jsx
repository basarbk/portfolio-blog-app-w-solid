import { mergeProps } from "solid-js";

export function AppSpinner(props) {
  const merged = mergeProps({ size: "small", full: false }, props);

  const classes = () =>
    `spinner-border ${merged.size === "small" ? "spinner-border-sm" : ""}`;

  if (!merged.full) {
    return <span class={classes()} aria-hidden="true"></span>;
  }

  return (
    <div class="bg-white border border-3 rounded-4 text-center p-4">
      <span class={classes()} aria-hidden="true"></span>
    </div>
  );
}
