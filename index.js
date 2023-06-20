const express = require("express");
// const { createHandler } = require("graphql-http/lib/use/express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const app = express();

mongoose.connect("mongodb+srv://devjuma03:omarionJumah@cluster0.wh5jcsc.mongodb.net/")
mongoose.connection.once("open", () => {
  try{
    console.log("Connected to database");
  }
catch(err){
  console.log(err);
}
});
app.use("/graphql", graphqlHTTP({
     schema,
     graphiql : true,
    }));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
