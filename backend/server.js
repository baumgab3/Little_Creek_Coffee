require('dotenv').config();

const cors = require('cors')
const express = require('express');
const productCategoryRoutes = require('./routes/product-category/productCategoryRoutes');

const app = express();
app.use(cors())
app.use(express.json());
// app.get("/", (req, res) => {
//     res.send("Hello fron express.");
// })

// end points
app.use("/product-category", productCategoryRoutes);


app.listen('8081', () => {
    console.log("server started on port 8081");
});