var express = require("express");
const path = require("path");
const { urlencoded } = express;

const engine = require("consolidate");
const app = express();
const port = 5000;
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/static", express.static("static")); //for serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded());

app.set("views", path.join(path.dirname(""), "/views")); //for serving templates of html
app.engine("html", engine.mustache);
app.set("view engine", "html");

app.get("/",(req,res)=>{
    res.status(200).render("form");
})

app.listen(port, () => console.log("The application has started successfully"));
