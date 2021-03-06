let express = require("express");
let mongoose = require("mongoose");

let cors = require("cors");
let app = express();
app.use(cors());
let user = require("./routes/user");
let auth = require("./routes/auth/user");
let config = require("config");
//middlewares
app.use(express.json());
app.use("/api/users", user);
app.use("/api", auth);

if (!config.get("ENV_PASSWORD")) {
  console.log("ACCESS DENIED");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/kan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(`Something went wrong ${error.message}`);
  });

let port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Port is working on ${port}`);
});
