const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { catchAsync } = require("../utils/catchAsync.js");
const AppError = require("../utils/AppError.js");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, bio, skills, avatar } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return next(new AppError("Email already in use", 409));
  }

  const user = await User.create({
    name,
    email,
    password,
    bio,
    skills,
    avatar,
  });

  const token = signToken(user._id);
  user.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);
  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

module.exports = { registerUser, loginUser };
