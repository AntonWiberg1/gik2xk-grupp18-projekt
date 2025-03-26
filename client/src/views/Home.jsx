import { Box, Paper, Grid2 } from "@mui/material";
import Presentation from "../components/Presentation";
import Review from "../components/Review";

// View för startsidan. Innehåller komponent för presentation och fiktiv review. Grid från MUI. 

function Home() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <Grid2 item xs={12} sm={6} md={12}>
      <Presentation/>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={6}>
      <Review/>
      </Grid2>
      
    </Box>
  );
}

export default Home;
