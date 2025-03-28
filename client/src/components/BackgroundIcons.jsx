import React from "react";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import { Box } from "@mui/material";

// backgrund, vi slänger ut ikoner på random ställen med random oppacity. Massa inline css för att få det att se ok ut.
// vi skapar en array med längden count, allt som ligger i den börjar som undefined så vi omvandlar dom till ett JSX element med =>
const BackgroundIcons = ({ count = 8 }) => {
  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, i) => (
        <DeveloperBoardIcon
          key={i}
          sx={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5,
            fontSize: `${0.5 + Math.random() * 1.5}rem`,
            color: "rgba(25, 118, 210, 0.2)",
          }}
        />
      ))}
    </Box>
  );
};

export default BackgroundIcons;
