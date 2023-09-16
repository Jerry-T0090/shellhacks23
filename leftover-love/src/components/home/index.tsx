import { useAuth0 } from "@rturnq/solid-auth0";
import LogoutButton from "../login/logoutButton";

const Dashboard = () => {
  const auth = useAuth0();
  return (
    <>
      Home dash: {auth?.user()} {console.log(auth?.user())}
      <LogoutButton />
    </>
  );
};

export default Dashboard;
