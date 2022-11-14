require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// creating our app using express
const app = express();
// accessing the database url from env file
const db = process.env.DATABASE_URL;
// accessing the port from env file
const port = process.env.PORT;

// connecting the database
try {
  mongoose.connect(db);
  console.log("DB connected succesfully");
} catch (error) {
  console.log("DB connection fails\n", error);
}

// using express.json to convert our data in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// creating the user schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// creating a user model
const user = mongoose.model("user", userSchema);

// simple get request to display the message
app.get("/", (req, res) => {
  res.send("Vinay");
});

// getting the data using post request
app.post("/", (req, res) => {
  // accessing the user data by req.body
  // console.log(req.body.name);
  console.log(req.body);
  // if there are multiple data, then i can destructure it
  const name = req.body.name;
  // creating the new document with name data, data should be in object and same as userschema
  const newUser = new user({ name });
  // saving our data in the database
  newUser
    .save()
    .then((result) => {
      console.log("user added sucessfully");
    })
    .catch((err) => {
      console.log("user adding failed\n", err);
    });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
