import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Presentation om företaget för startsidan. Välkomstmeddelande. Används i Home.jsx 

function Presentation() {
  const imageUrl =  'http://localhost:5000/images/Elgiganormus.png';
  return ( 
  <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}>
  <Card sx={{ mt: 10, maxWidth: 700, alignItems: "center" }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl} 
          onError={(e) => {
            console.error("Kunde inte ladda in bilden:", e.target.src);
            e.target.src = "http://localhost:5000/images/placeholder.jpg";
          }}
          sx={{
            objectFit: "filled",
            backgroundColor: "#f5f5f5",
            height: 350,
          }}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              <h4>ElGiganormus – din digitala destination för allt inom teknik, gaming och smart living.</h4>
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Hos oss hittar du marknadens hetaste elektronik, grymma erbjudanden och produkter som gör vardagen både enklare och roligare. Oavsett om du är ute efter en ny laptop, hemmabio eller nästa generations köksmaskin – vi har det du behöver. Med snabb leverans, kunnig support och prisgaranti strävar vi efter att vara din förstahandsbutik när det kommer till teknik i toppklass.
          </Typography>
        
        </CardContent>

        <CardActions>
          <Button size="small" component={Link} to={`/products/`}>
            Produkter
          </Button>
        </CardActions>
      
      </Card>
  
  </Box> );
}

export default Presentation;