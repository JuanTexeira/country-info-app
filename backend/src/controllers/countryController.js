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
  const countryCode = req.params.code;
  
  try {
    const countryInfo = await fetchCountryInfo(countryCode);
    res.json(countryInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country info' });
  }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo,
};
