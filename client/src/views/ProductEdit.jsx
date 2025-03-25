import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create, getOne, remove, update } from "../services/ProductService";
import { Chip, TextField, Button, Container, Typography, Box } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';


function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const emptyProduct = {id: 0, title: "", description: "", imageUrl: "", price: ""};
  const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    if (id) {
      getOne(id).then((product) => setProduct(product));
    } else {
      setProduct(emptyProduct)
    }
  }, [id]);

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newProduct = {...product, [name]: value };
    setProduct(newProduct);
  }
  function onSave() {
    if(product.id === 0) {
      create(product).then((response) => {
        navigate('/', {replace: true, 
          state: {message: `Produkten ${response.title} skpades.`}});
      });
    } else {
      update(product).then((response) => 
        navigate(`/products/${product.id}`, {replace: true, state: response}))
    }
  }

  function onDelete() {
    remove(product.id).then((response) =>  
      navigate('/', {replace: true, state: response}))
  }

  return ( 
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2">
        {product.id ? "Ändra inlägg " : "Lägg till produkt"}
        </Typography>
        <Box mt={4}>
          <form>
            <Box>
              <TextField 
                fullWidth
                margin="normal"
                onChange={onChange}
                value={product.title} 
                name='title' 
                id="title" 
                label="Title" 
              />
            </Box>
            <Box>
              <TextField 
                fullWidth
                margin="normal"
                onChange={onChange}
                value={product.body} 
                multiline 
                minRows={5} 
                name='body' 
                id="body" 
                label="Description" 
              />
            </Box>
            <Box>
              <TextField 
                fullWidth
                margin="normal"
                onChange={onChange}
                value={product.imageUrl} 
                name='imageUrl' 
                id="imageUrl" 
                label="Sökväg till bild"
              />
            </Box>
            <Box>
              <TextField 
                fullWidth
                margin="normal"
                onChange={onChange}
                value={product.price} 
                name='price' 
                id="price" 
                label="Pris"
              />
            </Box>
          
            <Box mt={2}>
              
            </Box >
            <Box display="flex" mt={2}>
              <Box flexGrow={1}>
              <Button
              startIcon={<ChevronLeftIcon/>}
              sx={{mr: 1}} 
              variant='contained' 
              onClick={() => navigate(-1)}>
                Tillbaka
              </Button>
              {id && (
                <Button 
                startIcon={<DeleteIcon/>} 
                onClick={onDelete} 
                variant="contained" 
                color="error">
              Ta bort 
              </Button>
              )}
              </Box>
              <Button 
              startIcon={<SaveIcon/>} 
              onClick={onSave} 
              variant='contained' 
              color="success">
                Spara
              </Button>
            </Box>
          </form>
  </Box>
  </Container>
)}

export default ProductEdit;
