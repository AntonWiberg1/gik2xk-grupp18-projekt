import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

// komponent för en fiktiv recension till startsidan, Importerad från MUI. 

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
    <Rating value={5} readOnly size="small" sx={{ mb: 1 }} />
      <Typography variant="h4" component="div">
      
      </Typography>
      
      <Typography variant="body2">
      "Supersmidig hemsida! Jag hittade det jag sökte direkt och kunde beställa på några minuter. Grym design, tydlig navigation och älskar att allt känns snabbt och modernt. Kommer definitivt handla här igen!"
        <br />
      </Typography>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, mt: 1}}>
      — Emma L., Stockholm
      </Typography>
    </CardContent>
    <CardActions>
    </CardActions>
  </React.Fragment>
);

export default function Review() {
  return (
    <Box sx={{ maxWidth: 275, justifycontent: "right", mt: 8}}>
      <Card>{card}</Card>
    </Box>
  );
}