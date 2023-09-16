import { useAuth0 } from "@rturnq/solid-auth0";
import { Button } from "@suid/material";

const LogoutButton = () => {
  const auth = useAuth0();

  return (
    <Button
      onClick={() =>
        auth?.logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
