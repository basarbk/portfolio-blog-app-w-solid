import { Show, createSignal } from "solid-js";
export function SignUp() {
  const [email, setEmail] = createSignal();
  const [apiProgress, setApiProgress] = createSignal(false);
  const [successMessage, setSuccessMessage] = createSignal();

  const onInputEmail = (event) => {
    setEmail(event.target.value);
  };

  const submit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setSuccessMessage();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email() }),
      });
      const body = await response.json();
      setSuccessMessage(body.message);
    } catch {
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      <form class="card" onSubmit={submit}>
        <div class="card-header text-center">
          <h1>Sign Up</h1>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="email" class="form-label">
              Email
            </label>
            <input id="email" class="form-control" onInput={onInputEmail} />
          </div>
          <Show when={successMessage()}>
            <div class="alert alert-success" role="alert">
              {successMessage()}
            </div>
          </Show>
          <div class="text-center">
            <button
              disabled={!email() || apiProgress()}
              class="btn btn-primary"
            >
              <Show when={apiProgress()}>
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
              </Show>
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
