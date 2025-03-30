import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create, getOne, remove, update } from "../services/ProductService";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';

//VisuallyHiddenInput stylar vid knappen för vår filuppladdning av bilder
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// function för att editera en produkt
function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const emptyProduct = { id: 0, title: "", description: "", imageUrl: "", price: "" };
  const [product, setProduct] = useState(emptyProduct);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  //använder en previewbild av produkten när den är vald
  useEffect(() => {
    if (id) {
      getOne(id).then((product) => {
        setProduct(product);
        if (product.imageUrl) {
          setPreviewUrl(`http://localhost:5000/images/${product.imageUrl}`);
        }
      });
    } else {
      setProduct(emptyProduct);
    }
  }, [id]);

  //function vid förändring
  function onChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  //hantera filändring
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  //ladda upp fil (bild) till skapad produkt
  const uploadFile = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.imageUrl; 
    } catch (error) {
      console.error("Fel vid filuppladdning:", error);
      setUploadError("Fel vid filuppladdning");
      return null;
    }
  };
  
  //sparar bilden till vår databas
  async function onSave() {
    try {
      let imageFilename = product.imageUrl; 

      if (selectedFile) {
        const uploadedFilename = await uploadFile();
        if (uploadedFilename) {
          imageFilename = uploadedFilename;
        }
      }

      const productToSave = {
        id: product.id,
        title: product.title,
        description: product.description,
        price: parseFloat(product.price),
        image_url: imageFilename, 
      };

      if (product.id === 0) {
        const response = await create(productToSave);
        navigate('/', { replace: true, state: { message: `Produkten ${response.title} skapades.` } });
      } else {
        await update(productToSave);
        navigate(`/products/${product.id}`, { replace: true });
      }
    } catch (error) {
      console.error('Fel vid sparande:', error);
      setUploadError(error.message || "Kunde inte spara produkt");
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2">
        {product.id ? "Ändra produkt" : "Lägg till produkt"}
      </Typography>

      <Box mt={4}>
        <form>

          <TextField fullWidth margin="normal" onChange={onChange} value={product.title} name="title" label="Titel" required />

          <TextField fullWidth margin="normal" onChange={onChange} value={product.description} multiline minRows={5} name="description" label="Beskrivning" />

          <Box mt={2}>
            <Typography variant="subtitle1">Produktbild</Typography>

            {previewUrl && (
              <Box mb={2}>
                <img src={previewUrl} alt="Förhandsgranskning" style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "4px", border: "1px solid #ddd" }} />
              </Box>
            )}

            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mr: 2 }}>
              Välj bild
              <VisuallyHiddenInput type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
            </Button>

            {uploadError && <Typography color="error" sx={{ mt: 1 }}>{uploadError}</Typography>}

          </Box>

          <TextField fullWidth margin="normal" label="Pris" name="price" type="number" value={product.price} onChange={onChange} />

          <Box display="flex" mt={4}>
            <Box flexGrow={1}>
              <Button startIcon={<ChevronLeftIcon />} sx={{ mr: 1 }} variant="contained" onClick={() => navigate(-1)}>Tillbaka</Button>
            </Box>

            <Button startIcon={<SaveIcon />} onClick={onSave} variant="contained" color="success">
              Spara
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default ProductEdit;
