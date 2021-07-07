const express = require("express");
const multer = require("multer");

const route = express.Router();

const File = require("../Model/Files");
/*
Pages....
Home page for upload file
upload confirm page
get file page 

routes....

get:homepage
post:uploadfile res.upload confilem page
get: search file
get:download file

*/
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Archive");
  },
  filename: (req, file, cb) => {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    let filename =
      Date.now() + Math.round(Math.random() * 100000) + "." + extension;
    req.body.upfilename = filename;
    cb(null, filename);
  },
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 200000000,
  },
});

route.get("/", (req, res) => {
  res.render("home");
});

route.post("/upload", upload.single("file"), (req, res) => {
  const fID = Date.now() + "-" + Math.round(Math.random() * 100000);
  const newFile = new File({
    title: req.body.filetitle,
    fID,
    filename: req.body.upfilename,
  });
  // entry to db
  newFile.save(err => {
    if (err) res.redirect("/");
    else {
      res.render("uploadok", {
        title: req.body.filetitle,
        link: req.protocol + "://" + req.get("host") + "/" + fID,
      });
    }
  });
});

route.get("/:id", (req, res) => {
  File.findOne({ fID: req.params.id }, (err, data) => {
    if (err) res.render("file", { err: true });
    else if (!data) res.render("file", { found: false });
    else
      res.render("file", {
        found: true,
        title: data.title,
        downloadid: data.fID,
      });
  });
});

route.get("/download/:id", (req, res) => {
  File.findOne({ fID: req.params.id }, (err, data) => {
    if (err) res.render("file", { found: false });
    else if (!data) res.render("file", { found: false });
    else
      res.download("Archive/" + data.filename, () => {
        res.status(500).end();
      });
  });
});

module.exports = route;
