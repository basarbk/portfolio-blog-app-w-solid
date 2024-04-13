import { splitProps } from "solid-js";
import defaultProfileImage from "../assets/profile.png";

export function AppImage(props) {
  const [imageOptions, attributes] = splitProps(props, [
    "image",
    "class",
    "fallback",
  ]);

  let imageSrc;
  if (imageOptions.image) {
    imageSrc = `/api/assets/${imageOptions.image}`;
  } else {
    imageSrc =
      imageOptions.fallback === "profile"
        ? defaultProfileImage
        : "https://place-hold.it/600x300/666/fff/000?text=Article%20Image";
  }

  return (
    <img
      class="w-100 object-fit-cover"
      classList={{
        [imageOptions.class]: true,
      }}
      src={imageSrc}
      {...attributes}
    />
  );
}
