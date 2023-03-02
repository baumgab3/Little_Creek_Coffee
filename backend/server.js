require('dotenv').config();

const cors = require('cors')
const express = require('express');


const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello fron express.");
})


app.listen('8081', () => {
    console.log("server started on port 8081");
});