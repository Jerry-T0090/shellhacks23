import { RouteDefinition, useNavigate, useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import Login from "./components/login/login";
import Home from "./components/home/home"

const BaseRedirect = () => {
  const navigate = useNavigate();
  navigate("/login", { replace: true });
  return <></>;
};

const routes: RouteDefinition[] = [
  { path: "/login", component: Login },
  { path: "/", component: BaseRedirect },
  { path: "/home", component: Home },
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
