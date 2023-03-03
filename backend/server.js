require('dotenv').config();

const conn = require('./database/connection');
const util = require('util');
const cors = require('cors')
const express = require('express');


const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello fron express.");
})

// test connection
// const query = util.promisify(conn.query).bind(conn);

app.listen('8081', () => {
    console.log("server started on port 8081");
});