import { Show, createSignal } from "solid-js";
export function SignUp() {
  const [email, setEmail] = createSignal();
  const [apiProgress, setApiProgress] = createSignal(false);
  const [successMessage, setSuccessMessage] = createSignal();
  const [errorMessage, setErrorMessage] = createSignal();
  const [errors, setErrors] = createSignal({});

  const onInputEmail = (event) => {
    setEmail(event.target.value);
    setErrors({});
  };

  const submit = async (event) => {
    event.preventDefault();
    setSuccessMessage();
    setErrorMessage();
    const form = event.target;
    if (!form.checkValidity()) {
      setErrors({ email: "Invalid email" });
      return;
    }

    setApiProgress(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email() }),
      });
      const body = await response.json();
      if (response.status === 200) {
        setSuccessMessage(body.message);
      } else if (response.status === 400) {
        setErrors(body.validationErrors);
      }
    } catch {
      setErrorMessage("Unexpected error occured, please try again");
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      <form class="card" onSubmit={submit} noValidate>
        <div class="card-header text-center">
          <h1>Sign Up</h1>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="email" class="form-label">
              Email
            </label>
            <input
              id="email"
              class="form-control"
              onInput={onInputEmail}
              type="email"
            />
            <span class="small text-danger">{errors().email}</span>
          </div>
          <Show when={errorMessage()}>
            <div class="alert alert-danger" role="alert">
              {errorMessage()}
            </div>
          </Show>
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
