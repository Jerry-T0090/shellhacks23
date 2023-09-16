import { RouteDefinition, useNavigate, useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import Login from "./components/login/login";

const BaseRedirect = () => {
  const navigate = useNavigate();
  navigate("/login", { replace: true });
  return <></>;
};

const routes: RouteDefinition[] = [
  { path: "/login", component: Login },
  { path: "/", component: BaseRedirect },
];

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <>
      <Routes />
    </>
  );
};

export default App;
