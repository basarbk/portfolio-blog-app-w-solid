import { createSignal } from "solid-js";
import { Feed } from "../../components";
import { Filter } from "./components/Filter";
export function Home() {
  const [filter, setFilter] = createSignal();
  return (
    <>
      <Filter setFilter={setFilter} />
      <Feed filter={filter()} />
    </>
  );
}
