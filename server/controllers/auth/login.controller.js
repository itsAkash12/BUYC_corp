require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const AuthModel = require("../../models/Auth.model");

const loginAuth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthModel.findOne({ email });
    if (user) {
      const verify = await argon2.verify(user.password, password);
      if (verify) {
        const details = {
          id: user._id,
          firstname: user.first_name,
          lastname: user.last_name,
          gender: user.gender,
          email: user.email,
          role: user.role,
        };
        const token = jwt.sign(details, process.env.SECRET_KEY, {
          expiresIn: "2 days",
        });
        
        return res.status(200).cookie("token", token).send({
          status: "success",
          message: "Logged In Successfully",
          token,
          user
        });
      } else {
        return res.status(401).send({ status: "failed", message: "Wrong Credentials" });
      }
    } else {
      return res.status(401).send({ status: "failed", message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(401).send({ status: "failed", message: error.message });
  }
};

module.exports = loginAuth
