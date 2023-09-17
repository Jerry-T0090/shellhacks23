import { useAuth0 } from "@rturnq/solid-auth0";
import LoginButton from "./loginButton";
import { Input } from "@suid/material";

const Login = () => {
  const auth = useAuth0();

  return (
    <>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        minlength="8"
        //onInput={(e) => setFields("password", e.target.value)}
      />
      <LoginButton />
    </>
  );
};

export default Login;
