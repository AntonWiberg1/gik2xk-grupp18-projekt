import {Box, Button} from '@mui/material'
import HoverRating from './HoverRating';

function ReviewForm (){
    return(
        
    <Box>
        <div>
        Add rating: <HoverRating />
        </div>
        <div>
        Rewiew: <textarea rows = "3"></textarea>
        </div>
        <Button> Lämna recension</Button>
    </Box>);
}
export default ReviewForm;