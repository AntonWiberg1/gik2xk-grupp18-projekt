import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HoverRating from "./HoverRating";
import { addOne } from "../services/CartService";
import Box from "@mui/material/Box";


function Presentation() {
  const imageUrl =  'client\src\assets\react.svg';
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
          height="140"
          /* image={imageUrl} */
          onError={(e) => {
            console.error("Image failed to load:", e.target.src);
            e.target.src = "https://via.placeholder.com/250x140?text=Image+Not+Found";
          }}
          sx={{
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
            height: 140,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            
              <h4>ElGiganormus – din digitala destination för allt inom teknik, gaming och smart living.</h4>
              

          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
          
Hos oss hittar du marknadens hetaste elektronik, grymma erbjudanden och produkter som gör vardagen både enklare och roligare. Oavsett om du är ute efter en ny laptop, hemmabio eller nästa generations köksmaskin – vi har det du behöver.

Med snabb leverans, kunnig support och prisgaranti strävar vi efter att vara din förstahandsbutik när det kommer till teknik i toppklass.
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