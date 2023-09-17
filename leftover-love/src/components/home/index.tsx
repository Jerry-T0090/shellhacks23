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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: theme.palette.text.secondary,
  background: 'rgba(200, 200, 200, 0.1)',
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const SquareButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

const Dashboard = () => {
  // Define a signal to store your MongoDB data with a type annotation
  const [data, setData] = createSignal<
    { id: number; name: string; description: string; image: string }[]
  >([]);

  // Fetcher
  const fetchData = async () => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT_HERE"); // Replace with API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // OG Fetch
  onCleanup(() => {
    fetchData();
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
