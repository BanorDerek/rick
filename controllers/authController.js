const User = require("../models/user");
const Bank = require("../models/bank");
const CustomErrors = require("../errors");

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomErrors.BadRequestError(
      "Please enter both email and password"
    );

  const user = await User.create(req.body);
  res.status(201).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomErrors.BadRequestError(
      "Please enter both email and password"
    );

  const user = await User.findOne({ email });

  if (!user) throw new CustomErrors.NotFoundError(`Invalid login credentials`);
  const isCorrect = await user.comparePasswords(password);

  if (!isCorrect)
    throw new CustomErrors.UnauthenticatedError("Incorrect login credentials");
  res.status(200).json({ user });
};

const bankSignup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomErrors.BadRequestError(
      "Please enter both email and password"
    );

  const bank = await Bank.create(req.body);
  res.status(201).json({ bank });
};

const bankLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomErrors.BadRequestError(
      "Please enter both email and password"
    );

  const bank = await Bank.findOne({ email });

  if (!bank) throw new CustomErrors.NotFoundError(`Invalid login credentials`);
  const isCorrect = await bank.comparePasswords(password);

  if (!isCorrect)
    throw new CustomErrors.UnauthenticatedError("Incorrect login credentials");
  res.status(200).json({ bank });
};

module.exports = { signup, login, bankSignup, bankLogin };
