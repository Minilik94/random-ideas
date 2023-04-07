const path = require("path");
const express = require("express");
const ideasRouter = require("./routes/ideas");
const connectDB = require('./config/db')
require("dotenv").config();
const port = process.env.PORT || 5000;

connectDB()

const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to random ideas API" });
});

app.use("/api/ideas", ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
