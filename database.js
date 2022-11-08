const Sequelize = require("sequelize");
var creds = require("./creds.json");
const fs = require("fs");

//Using Sequelize as Object Relational Mapper
const sequelize = new Sequelize(
  creds.newCreds.Name,
  `${creds.newCreds.Username}`,
  `${creds.newCreds.Password}`,
  {
    host: `${creds.newCreds.host}`,
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

//creating table(if it exists no action will be performed)
const userTable = sequelize.define("userResume", {
    userName: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    Date: Sequelize.DataTypes.DATE,
    FileName: Sequelize.DataTypes.STRING,
});

module.exports={

    //a seperate function for inserting values into our database
    insertIntoTable:async function (name, coun, Date, FileN) {
      await userTable.sync();
      userTable.create({
        userName: name,
        country: coun,
        Date: Date,
        FileName: FileN,
      });
    },
    
    //delete Record function
    deleteR:function(req,res){
        const file = req.cookies.FileName;
        console.log("File->"+file);
        fs.unlinkSync(__dirname+`/static/${file}`);
        userTable.destroy({
          where: { FileName: file },
        });
        res.clearCookie("FileName");
        res.end();
    },

    getRespones:function(req,res){
  
        //sorting using Name or Date
      var orderVar="userName";
      if(!req.body.sName){
        orderVar="Date"
      }
      userTable
        .findAll({
          attributes: ["userName", "country", "Date", "FileName"],
          order: [
            [orderVar],
          ],
        })
        .then(function (result) {
          res.send(result);
        });
    }
}
