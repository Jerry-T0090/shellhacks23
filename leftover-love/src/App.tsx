import { RouteDefinition, useNavigate, useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import Login from "./components/login";
import Dashboard from "./components/home";

const BaseRedirect = () => {
  const navigate = useNavigate();
  navigate("/login", { resolve: true, replace: true });
  return <></>;
};

const routes: RouteDefinition[] = [
  { path: "/login", component: Login },
  { path: "/", component: BaseRedirect },
  { path: "/logout", component: BaseRedirect },
  { path: "/home", component: Dashboard },
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
