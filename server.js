var express = require("express");
const path = require("path");
const { urlencoded } = express;
const Sequelize = require("sequelize");
const countryList = require("./static/countries.json");
var creds = require("./creds.json");
//for file management
const multer = require("multer");

const engine = require("consolidate");
const app = express();
const port = 5000;
var cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());
app.use("/static", express.static("static")); //for serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded());

app.set("views", path.join(path.dirname(""), "/views")); //for serving templates of html
app.engine("html", engine.mustache);
app.set("view engine", "html");

//Using Sequelize as Object Relational Mapper
const sequelize = new Sequelize(
  "internship",
  `${creds.sql.user}`,
  `${creds.sql.password}`,
  {
    host: `${creds.sql.host}`,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

//  Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `resume/${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage: multerStorage,
});

//To Serve HTML Files
app.get("/", (req, res) => {
  res.status(200).render("form");
});

//To get Data for autocomplete
app.get("/get_data", function (req, res, next) {
  var listObjects = [];
  var search_query = req.query.search_query;
  console.log(search_query);
  countryList.countries.forEach((item) => {
    if (item.name.includes(search_query)) listObjects.push(item);
  });
  res.send(listObjects);
});

//endpoint for getting files from user

app.post("/api/uploadFile", upload.single("getResume"), (req, res) => {
  console.log(req.file);
  res.status(200).render("form");
    //Download PDF File
//   res.download("./static/resume/getResume-1667844707323.pdf", (err)=>console.log("Error-:"+err));
    //View Pdf File
    res.sendFile(__dirname+"/static/resume/getResume-1667844707323.pdf");
});

app.listen(port, () => console.log("The application has started successfully"));
