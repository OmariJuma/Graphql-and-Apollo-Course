const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const app = express();
const {ruruHTML} = require("ruru/server")
require("dotenv").config();
const cors = require("cors");

app.use(cors());
mongoose.connect(process.env.DB_URL)
mongoose.connection.once("open", () => {
  try{
    console.log("Connected to database");
  }
catch(err){
  console.log(err);
}
});

app.use("/graphql", createHandler({
     schema,
    }));
app.get("/ruru",(_req, res)=>{
  res.type("html");
  res.end(ruruHTML({endpoint:"/graphql"}))
} )
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
