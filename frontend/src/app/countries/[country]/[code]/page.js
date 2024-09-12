"use client";
import { getCountryInfo } from '@/app/services/countryService';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import React from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const CountryInfo = async ({ params }) => {
  const { country, code } = params;

  let countryData;
  try {
    countryData = await getCountryInfo(country, code);
  } catch (error) {
    console.error('Failed to fetch country information:', error);
    return <p className="text-red-600 text-center">Failed to load country data</p>;
  }

  const populationData = countryData?.population || [];

  const chartData = {
    labels: populationData.map((entry) => entry.year),
    datasets: [
      {
        label: 'Population over time',
        data: populationData.map((entry) => entry.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Country Information</h1>

      {countryData ? (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <div className="flex gap-2 items-center justify-center mb-4">
            <img src={countryData.flag} alt="Country Flag" className="w-10" />
            <h2 className="text-2xl font-bold">{params.country.charAt(0).toUpperCase() + params.country.slice(1)}</h2>
          </div>

          <h1 className="text-2xl font-bold text-center mb-4">Population</h1>
          <div className="my-4">
            <Line data={chartData} />
          </div>

          <p className="text-gray-700">
            <strong>Borders:</strong>{' '}
            {countryData.borders.map((border, index) => (
              <span key={index}>
                {border.commonName}
              </span>
            ))}
          </p>
        </div>
      ) : (
        <p className="text-center">Loading country information...</p>
      )}
    </div>
  );
};

export default CountryInfo;
