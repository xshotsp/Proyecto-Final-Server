const server = require("./src/server");
const express = require("express");
const { conn } = require("./src/db.js");
const { apiLoaderProducts } = require("./src/apiLoaderProducts.js");
const { createAdmin } = require("./src/createAdmin.js");
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_CLOUD_KEY, API_SECRET } = process.env

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json({ upload_max_filesize: "10M" }));

cloudinary.config({
  CLOUD_NAME,
  API_CLOUD_KEY,
  API_SECRET
});

conn
  .sync({ force: false })
  .then(() => {
    // Cambia la llamada a server.listen por app.listen
    server.listen(PORT, "0.0.0.0", async () => {
       await apiLoaderProducts();
       await createAdmin(); 
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
