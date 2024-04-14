import { createSignal } from "solid-js";
import { AppButton, AppInput, ImageSelector } from "../../../components";
import { useAuth } from "../../../context/Auth";
import { useNavigate } from "@solidjs/router";

export function EditUser() {
  const { auth, userUpdated } = useAuth();
  const [name, setName] = createSignal(auth.name);
  const [image, setImage] = createSignal(auth.image);
  const [errors, setErrors] = createSignal({});
  const navigate = useNavigate();

  const onChangeName = (event) => {
    setName(event.target.value);
    setErrors({});
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const result = await fetch(`/api/users/${auth.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name(), image: image() }),
      });
      const body = await result.json();
      if (result.status === 200) {
        userUpdated(name(), image());
        navigate(`/${auth.handle}`);
      } else if (result.status === 400) {
        setErrors(body.validationErrors);
      }
    } catch {}
  };

  return (
    <form onSubmit={submit}>
      <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
        <div class="card">
          <div class="card-header">
            <ImageSelector image={image()} setImage={setImage} />
          </div>
          <div class="card-body">
            <AppInput
              id="name"
              label="Name"
              value={name()}
              onInput={onChangeName}
              help={errors().name}
            />
            <AppButton>Save</AppButton>
          </div>
        </div>
      </div>
    </form>
  );
}
