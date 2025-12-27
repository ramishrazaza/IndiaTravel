const express = require("express");
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const rootRoutes = require("./routes/root");


const app = express();
const port = 3000;

// Configure ejs-mate as the view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", rootRoutes);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});