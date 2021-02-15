const express = require("express");
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;
const apiRoutes = require('./routes/apiRoutes')
const { urlencoded } = require("body-parser");
const cors = require("cors")

app.use(cors())
app.use(urlencoded());
app.use(express.json());
app.use(apiRoutes);


app.listen(port, () => {
  console.log("Im alive at port: " + port);
});
