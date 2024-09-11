export async function getCountries() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/available`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    throw error;
  }
}

export async function getCountryInfo(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/country-info/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch country info:', error);
    throw error;
  }
}

export async function getBorderCountries(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/border-countries/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch border countries:', error);
    throw error;
  }
}

export async function getPopulationData(id) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/population/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch population data:', error);
    throw error;
  }
}
