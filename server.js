var express = require("express");
const path = require("path");
const { urlencoded } = express;
const {insertIntoTable,deleteR,getRespones}=require("./database.js")
const countryList = require("./static/countries.json");
var creds = require("./creds.json");
let cookieParser = require("cookie-parser");

//for file management
const multer = require("multer");

const engine = require("consolidate");
const app = express();
const port = process.env.PORT || 5000;
var cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/static", express.static("static")); //for serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded());

app.set("views", path.join(path.dirname(""), "/views")); //for serving templates of html
app.engine("html", engine.mustache);
app.set("view engine", "html");


//  Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const FileName = `resume/${req.body.Name}-${Date.now()}.${ext}`;

    //call function to insert values to our database
    insertIntoTable(req.body.Name, req.body.country, req.body.date, FileName);
    cb(null, FileName);
  },
});
const upload = multer({
  storage: multerStorage,
});

//To Serve HTML Files
app.get("/", (req, res) => {
  res.status(200).render("form");
});
app.get("/response", (req, res) => {
  res.status(200).render("response");
});

//To get Data for autocomplete
app.get("/get_data", function (req, res, next) {
  var listObjects = [];
  var search_query = req.query.search_query;
  countryList.countries.forEach((item) => {
    if (item.name.includes(search_query)) listObjects.push(item);
  });
  res.send(listObjects);
});


//Endpoint for getting files from user
app.post("/uploadFile", upload.single("getResume"), (req, res) => {
  res.status(200).render("form");
});

// Download/View Document
app.post("/document/download", (req, res) => {
  res.download(`./static/${req.cookies.FileName}`, (err) =>
    console.log("Error-:" + err)
  );
  res.clearCookie("FileName");
});
app.post("/document/view", (req, res) => {
  res.sendFile(__dirname + `/static/${req.cookies.FileName}`, (err) =>
    console.log("Error-:" + err)
  );
  res.clearCookie("FileName");
});


//get Responses data from database
app.post("/getResponsesData", (req, res) => getRespones(req,res));

//endPoint for deleting records
app.get("/deleteRecords", async (req, res) => deleteR(req,res));


app.listen(port, () => console.log("The application has started successfully"));


