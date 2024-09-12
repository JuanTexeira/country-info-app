const { fetchAvailableCountries, fetchCountryInfo } = require('../services/countryService');

const getAvailableCountries = async (req, res) => {
  try {
    const countries = await fetchAvailableCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available countries' });
  }
};

const getCountryInfo = async (req, res) => {
  const { name, code } = req.body;

  try {
    const countryInfo = await fetchCountryInfo(name, code);
    res.json(countryInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country info' });
  }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo,
};
