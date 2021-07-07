const express = require("express");
const { join } = require("path");
const { connect } = require("mongoose");
const app = express();

// confit & meddilwere
require("dotenv").config();
const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.set("views", join(__dirname, "/view"));
app.use(express.json());
app.use("/", express.static("public"));
app.use("/", require("./router/index"));

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PP}@cluster0.do0vw.mongodb.net/mydb?retryWrites=true&w=majority`;

connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) console.log(err.message);
  else app.listen(port, () => console.log(`server at ${port}`));
});
