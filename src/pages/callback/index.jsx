import { Switch, createEffect, createSignal } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { AppAlert, AppSpinner } from "../../components";
import { useAuth } from "../../context/Auth";
export function Callback() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = createSignal("loading");
  const [message, setMessage] = createSignal();
  const { setAuth } = useAuth();

  createEffect(async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: searchParams.token,
          operation: searchParams.operation,
        }),
      });
      const body = await response.json();
      if (response.status === 200) {
        setMessage("Account is created");
        setStatus("success");
        setMessage("Account is created");
        setAuth(body);
      } else {
        setStatus("fail");
        setMessage(body.message);
      }
    } catch {
      setStatus("fail");
      setMessage("Unexpected error occured, please try again");
    }
  });
  return (
    <div>
      <Switch fallback={<AppSpinner full size="normal" />}>
        <Match when={status() === "fail"}>
          <AppAlert variant="danger">{message()}</AppAlert>
        </Match>
        <Match when={status() === "success"}>
          <AppAlert>{message()}</AppAlert>
        </Match>
      </Switch>
    </div>
  );
}
