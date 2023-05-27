const Bank = require("../models/bank");

const sortBank = async (req, res) => {
  const { region, district, search } = req.query;

  let queryObject = {};

  if (region && region !== "all") {
    queryObject.region = region;
  }

  if (district && district !== "all") {
    queryObject.district = district;
  }

  if(search) {
    queryObject.bloodBankName = { $regex: search, $options: 'i'}
  }

  const banks = await Bank.find(queryObject);
  res.status(200).json({ banks });
};

module.exports = { sortBank };
