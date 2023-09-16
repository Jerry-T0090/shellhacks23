import { useAuth0 } from "@rturnq/solid-auth0";
import { Button } from "@suid/material";

const LoginButton = () => {
  const auth = useAuth0();

  return (
    <>
      <Button onClick={() => auth?.loginWithRedirect()}>Log In</Button>
    </>
  );
};

export default LoginButton;
