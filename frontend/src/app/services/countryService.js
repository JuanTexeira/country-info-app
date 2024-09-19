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

export async function getCountryInfo(name, code) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, code }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to fetch country info:', error);
    throw error;
  }
}