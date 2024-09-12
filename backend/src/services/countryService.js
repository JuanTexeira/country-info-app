const axios = require('axios');

const nagerAPI = process.env.NAGER_API_URL;
const countriesNowAPI = process.env.COUNTRIES_NOW_API_URL;

const fetchAvailableCountries = async () => {
  try {
    console.log(nagerAPI)
    const response = await axios.get(`${nagerAPI}/AvailableCountries`);
    console.log('Available countries:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};


const fetchCountryInfo = async (countryName="nigeria", countryCode="NG") => {
  const [bordersResponse, populationResponse, flagResponse] = await Promise.all([
    axios.get(`${nagerAPI}/CountryInfo/${countryCode}`), 
    axios.post(`${countriesNowAPI}/population`, { country: countryName }), 
    axios.post(`${countriesNowAPI}/flag/images`, { iso2: countryCode })
  ]);

  console.log({borders: bordersResponse.data.borders, 
    population: populationResponse.data.data.populationCounts, 
    flag: flagResponse.data.data.flag})

  return {
    borders: bordersResponse.data.borders, 
    population: populationResponse.data.data.populationCounts, 
    flag: flagResponse.data.data.flag
  };
};

module.exports = {
  fetchAvailableCountries,
  fetchCountryInfo,
};
