import { useAuth0 } from "@rturnq/solid-auth0";
import { useNavigate } from "@solidjs/router";
import { CircularProgress } from "@suid/material";
import { Match, Switch, createEffect, createSignal, onMount } from "solid-js";
import BasicAppBar from "../navbar home/navbarHome";

const Pending = () => {
  const auth = useAuth0();
  const navigator = useNavigate();
  const [ticker, setTicker] = createSignal<number>(0);
  const [signup, setSignup] = createSignal<boolean | undefined>(undefined);

  createEffect(() => {
    const count = ticker();
    setInterval(() => {
      setTicker(count + 1);
    }, 500);
    if (auth?.isAuthenticated()) {
      clearInterval;
      isUserNew();
    }
  });
  const isUserNew = async () => {
    const user = await auth?.auth0Client()?.getUser();
    console.log(user);
    if (user) setSignup(false);
    // Todo check DB for user info
    // if no info
    // setSignup(true)
  };

  return (
    <>
      <BasicAppBar />
      <Switch
        fallback={
          <div class="w-full h-screen flex flex-col self-center items-center justify-center">
            <CircularProgress />
          </div>
        }
      >
        <Match when={signup()}>
          <>{navigator("/signup")}</>
        </Match>
        <Match when={signup() === false}>
          <>{navigator("/home")}</>
        </Match>
      </Switch>
    </>
  );
};

export default Pending;
