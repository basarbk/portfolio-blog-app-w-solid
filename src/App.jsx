import { NavBar } from "./components";

function App(props) {
  return (
    <>
      <NavBar />
      <div class="container mt-3">{props.children}</div>
    </>
  );
}

export default App;
