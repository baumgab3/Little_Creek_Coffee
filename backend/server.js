require('dotenv').config();

const cors = require('cors')
const express = require('express');
const productCategoryRoutes = require('./routes/productCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');


const app = express();
app.use(cors())
app.use(express.json());
// app.get("/", (req, res) => {
//     res.send("Hello fron express.");
// })

// end points
app.use("/product-category", productCategoryRoutes);
app.use("/product", productRoutes);
app.use("/", userRoutes);
app.use("/", sessionRoutes);


app.listen('8081', () => {
    console.log("server started on port 8081");
});