import { createSignal } from "solid-js";
import { AppAlert, AppButton, AppInput } from "../../components";
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
          <AppInput
            id="email"
            label="Email"
            onInput={onInputEmail}
            type="email"
            help={errors().email}
          />
          <AppAlert variant="danger">{errorMessage()}</AppAlert>
          <AppAlert>{successMessage()}</AppAlert>
          <div class="text-center">
            <AppButton loading={apiProgress()} disabled={!email()}>
              Sign Up
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
}
