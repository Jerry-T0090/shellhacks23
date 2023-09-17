import { For, createSignal, onCleanup } from "solid-js";
import BasicAppBar from "../navbar home/navbarHome";
import {
  Stack,
  Typography,
  Paper,
  styled,
  Button,
  Box,
  Grid,
} from "@suid/material";

// Define a styled Paper component for each item with a barely visible gray background
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: theme.palette.text.secondary,
  background: "rgba(200, 200, 200, 0.1)", // Barely visible gray background
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  height: "100%", // Match the height of the stack item
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SquareButton = styled(Button)(({ theme }) => ({
  width: "100%", // Make the button square
  height: "100%", // Make the button square
}));

const Dashboard = () => {
  // Define a signal to store your MongoDB data with a type annotation
  const [data, setData] = createSignal<
    { id: number; name: string; description: string; image: string }[]
  >([]);

  // Simulate fetching data from MongoDB (replace with your actual data fetching logic)
  setTimeout(() => {
    const fetchedData = [
      {
        id: 1,
        name: "Item 1",
        description: "Description 1",
        image:
          "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
      },
      {
        id: 2,
        name: "Item 2",
        description: "Description 2",
        image:
          "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
      },
      {
        id: 3,
        name: "Item 3",
        description: "Description 3",
        image:
          "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
      },
      {
        id: 4,
        name: "Item 4",
        description: "Description 4",
        image:
          "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
      },
      {
        id: 5,
        name: "Item 5",
        description: "Description 5",
        image:
          "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
      },
      // Add more items as needed
    ];
    setData(fetchedData);
  }, 1000); // Simulated delay for demonstration purposes

  // Cleanup when the component unmounts
  onCleanup(() => {
    // Cleanup logic (if needed)
  });

  return (
    <>
      <BasicAppBar />
      <div style={{ padding: "40px 40px 20px 40px" }}>
        <Typography variant="h3" class="mb-5">
          Food Near You
        </Typography>
        <Stack spacing={2}>
          <For each={data()}>
            {(item) => (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography>{item.description}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <ButtonContainer>
                    <SquareButton variant="contained" color="primary">
                      Gimme Gimme!
                    </SquareButton>
                  </ButtonContainer>
                </Grid>
              </Grid>
            )}
          </For>
        </Stack>
      </div>
    </>
  );
};

export default Dashboard;
