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
    <form onSubmit={submit}>
      <h1>Sign Up</h1>
      <label for="email">Email</label>
      <input id="email" onInput={onInputEmail} />
      <button disabled={!email()}>Sign Up</button>
    </form>
  );
}
