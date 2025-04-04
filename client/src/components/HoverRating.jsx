import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

// Ratingkomponent importerad från MUI för att ha en dynamisk star-review komponent 

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({ ratings }) {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  React.useEffect(() => {
    if (ratings && ratings.length > 0) {
      const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
      const average = sum / ratings.length;
      setValue(average);
    } else {
      setValue(0); 
    }
  }, [ratings]);

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        readOnly 
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>
          {labels[hover !== -1 ? hover : value]} ({ratings?.length || 0} reviews)
        </Box>
      )}
    </Box>
  );
}