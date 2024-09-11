require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors'); // Import cors
const countryRoutes = require('./routes/countryRoutes');
const { fetchAvailableCountries } = require('./services/countryService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/countries', countryRoutes);

fetchAvailableCountries().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Error starting server:', error);
});


