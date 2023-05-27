const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const BankSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    bloodBankName: {
      type: String,
      required: true
    },
    contact: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

BankSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

BankSchema.methods.comparePasswords = async function (pword) {
    const isCorrect = bcrypt.compare(pword, this.password)
    return isCorrect
}

module.exports = mongoose.model("Bank", BankSchema);
