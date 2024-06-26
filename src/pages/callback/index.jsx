import { Switch, createEffect, createSignal } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { AppAlert, AppSpinner } from "../../components";
import { useAuth } from "../../context/Auth";
export function Callback() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = createSignal("loading");
  const [message, setMessage] = createSignal();
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

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
        setLoggedIn(body);
        if (searchParams.operation === "login") {
          navigate("/");
        } else {
          setStatus("success");
          setMessage("Account is created");
        }
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
          <a href="/article/new">Post Article</a>
        </Match>
      </Switch>
    </div>
  );
}
