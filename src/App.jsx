import { NavBar } from "./components";

function App(props) {
  return (
    <>
      <NavBar />
      <div>
        <a href="/callback?token=123&operation=register">Register 123</a>
      </div>
      <div>
        <a href="/callback?token=456&operation=register">Register 456</a>
      </div>
      <div class="container mt-3">{props.children}</div>
    </>
  );
}

export default App;
