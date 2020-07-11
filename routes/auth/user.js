let express = require("express");
let bcrypt = require("bcrypt");
let router = express.Router();
let model = require("../../db/user");

router.post("/auth", async (req, res) => {
  let user = await model.findOne({
    "UserLogin.UserName": req.body.UserLogin.UserName,
  });
  if (!user) {
    return res.status(404).send({ message: "Invalid Email ID" });
  }

  let validpassword = await bcrypt.compare(
    req.body.UserLogin.Password,
    user.UserLogin.Password
  );

  if (!validpassword) {
    return res.status(404).send({ message: "Invalid Password" });
  }
  res.send("Login Done");
});

module.exports = router;
