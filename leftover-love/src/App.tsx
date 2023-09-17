import { RouteDefinition, useNavigate, useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import Login from "./components/login";
import Dashboard from "./components/home";
import Signup from "./components/signup";

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
  {path: "/signup", component: Signup}
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
