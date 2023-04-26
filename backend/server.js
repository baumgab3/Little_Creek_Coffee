require('dotenv').config();

const cors = require('cors')
const express = require('express');
const productCategoryRoutes = require('./routes/productCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();
app.use(cors())
app.use(express.json());

// end points
app.use("/product-category", productCategoryRoutes);
app.use("/product", productRoutes);
app.use("/", userRoutes);
app.use("/", sessionRoutes);
app.use("/orders", orderRoutes);
app.use("/addresses", addressRoutes);
app.use("/search", searchRoutes);

app.listen('8081', () => {
    console.log("server started on port 8081");
});