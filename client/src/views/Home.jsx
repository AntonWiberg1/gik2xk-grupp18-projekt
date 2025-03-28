import { Box, Grid2 } from "@mui/material";
import Presentation from "../components/Presentation";
import Review from "../components/Review";

// View för startsidan. Innehåller komponent för presentation och fiktiv review. Grid från MUI.

function Home() {
  return (
    <Box>
      <Grid2>
        <Presentation />
      </Grid2>
      <Grid2>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </Box>
      </Grid2>
    </Box>
  );
}

export default Home;
