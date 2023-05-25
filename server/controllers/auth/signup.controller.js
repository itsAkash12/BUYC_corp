require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const AuthModel = require("../../models/Auth.model");
const signupAuth = async (req, res) => {
  const { first_name, last_name, email, gender, role, password } = req.body;
  try {
    const hashPassword = await argon2.hash(password);
    const reqData = {
      first_name,
      last_name,
      email,
      gender,
      avatar:
        gender === "male"
          ? "https://res.cloudinary.com/dyv0uxpi2/image/upload/v1676217724/2289_SkVNQSBGQU1PIDEwMjgtMTIy_hmkupv.jpg"
          : "https://res.cloudinary.com/dyv0uxpi2/image/upload/v1676217657/2289_SkVNQSBGQU1PIDEwMjgtMTEz_wf9gpj.jpg",
      password: hashPassword,
    };
    if (role) {
      reqData.role = role;
    }

    const user = new AuthModel(reqData);
    const token = jwt.sign(
      { id: user._id, first_name, last_name, email, gender },
      process.env.SECRET_KEY,
      { expiresIn: "2 days" }
    );

    await user.save();
    res.status(200).send({
      status: "success",
      message: "Successfully Registered to BUYCar World",
      token,
      user,
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
};

module.exports = signupAuth;
