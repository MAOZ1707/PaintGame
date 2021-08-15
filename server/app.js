require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");

// DB connect
// connectDB();

//Read req.body
app.use(express.json());

//Allow cors
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Routes
const ordersRoute = require("./routes/ordersRoute");

app.use("/api/orders", ordersRoute);

//Server
const PORT = process.env.PORT || 6000;
let server = app.listen(PORT, () => console.log(`App is running!! on ${PORT}`));
process.on("unhandledRejection", (err, p) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
