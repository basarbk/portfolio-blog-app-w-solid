import { createSignal } from "solid-js";
export function SignUp() {
  const [email, setEmail] = createSignal();

  const onInputEmail = (event) => {
    setEmail(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email() }),
    });
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
          <div class="text-center">
            <button disabled={!email()} class="btn btn-primary">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
