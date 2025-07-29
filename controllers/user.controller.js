const User = require("../models/user.model.js");
const { catchAsync } = require("../utils/catchAsync.js");

const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ status: "success", user: req.user });
});

const updateProfile = catchAsync(async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });

  res.status(200).json({ status: "success", updated });
});

module.exports = { getUser, updateProfile };
