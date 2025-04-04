var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const path = require('path');
const multer = require('multer');
const fs = require('fs');

//använder oss utav multer för att hantera och ladda upp bilder till vår databas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'stockImages');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // accepterar bara bild filer
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Bara bildfiler tillåtna!'), false);
    }
    cb(null, true);
  }
});


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  next();
});

app.use('/products', require('./routes/productRoute'));
app.use('/users', require('./routes/usersRoute'));
app.use('/carts', require('./routes/cartRoute'));

app.use('/images', express.static(path.join(__dirname, 'stockImages')));


//post request för att ladda up bilder med hjälp av multer
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Ingen fil har blivit uppladdad" });
  res.json({ imageUrl: req.file.filename }); 
});




module.exports = app;
