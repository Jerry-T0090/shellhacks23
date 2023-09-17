import { createSignal } from "solid-js";
import BasicAppBar from "../navbar home/navbarHome";
import { Stack, Paper, styled, Button } from "@suid/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: theme.palette.text.secondary,
  background: "rgba(200, 200, 200, 0.1)",
}));

const ButtonContainer = styled("div")(({ theme }) => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

const SquareButton = styled(Button)(({ theme }) => ({
    width: "100%",
    height: "100%",
}));
  

const Profile = () => {
  // Replace these with actual user data from your application
  const [userData] = createSignal({
    email: "user@example.com",
    password: "********",
    phoneNumber: "+1234567890",
    name: "John Doe",
    // Replace with the URL of the user's profile image
    profileImageURL: "https://mui.com/static/images/avatar/1.jpg",
  });

  const userDetails = [
    { label: "Name", value: userData().name },
    { label: "Email", value: userData().email },
    { label: "Password", value: userData().password },
    { label: "Phone Number", value: userData().phoneNumber },
  ];

  return (
    <>
      <BasicAppBar />

      <div style="padding: 20px;">
        {/* Profile Image */}
        <div style="margin-bottom: 20px; ">
          <img
            src={userData().profileImageURL}
            alt="Profile"
            style="width: 400px; height: auto;"
          />
        </div>

        {/* User Details */}
        <Stack spacing={2}>
          {userDetails.map((detail, index) => (
            <Item key={index}>
              <div>
                <strong>{detail.label}:</strong>
                <strong>               </strong>
                <strong>{detail.value}</strong>
              </div>
              <div>
              <ButtonContainer>
                  <SquareButton variant="contained" color="primary">EDIT</SquareButton>
                </ButtonContainer>
              </div>
            </Item>
          ))}
        </Stack>
      </div>
    </>
  );
};

export default Profile;
