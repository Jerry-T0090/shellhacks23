import { useAuth0 } from "@rturnq/solid-auth0";

const LoginButton = () => {
  const auth = useAuth0();

  return <button onClick={() => auth?.loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
