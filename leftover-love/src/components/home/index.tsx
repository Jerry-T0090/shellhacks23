import { useAuth0 } from "@rturnq/solid-auth0";

const Dashboard = () => {
  const auth = useAuth0();
  return (
    <>
      Home dash: {auth?.user()} {console.log(auth?.user())}
    </>
  );
};

export default Dashboard;
