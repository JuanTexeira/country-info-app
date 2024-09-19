// components/CountryInfoClient.js
'use client';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import CountryCard from '@/app/components/countryCard/countryCard';
import { getCountryInfo } from '@/app/services/countryService';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const CountryInfoClient = ({ params }) => {
  const { country, code } = params;
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const data = await getCountryInfo(country, code);
        setCountryData(data);
      } catch (error) {
        console.error('Failed to fetch country information:', error);
        setError('Failed to load country data');
      }
    };
    fetchCountryData();
  }, [country, code]);

  if (error) return <p className="text-red-600 text-center">{error}</p>;

  if (!countryData) return <p className="text-center">Loading country information...</p>;

  const populationData = countryData.population || [];

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

  const handleBack = () => {
    router.back(); // Go back to the previous page in history
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Country Information</h1>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <div className="flex gap-2 items-center justify-center mb-4">
          <img src={countryData.flag} alt="Country Flag" className="w-10" />
          <h2 className="text-2xl font-bold">{params.country.charAt(0).toUpperCase() + params.country.slice(1)}</h2>
        </div>

        <hr className="my-4 border-gray-300" />
        
        <h1 className="text-2xl font-bold text-center mb-4">Population</h1>
        <div className="my-4">
          <Line data={chartData} />
        </div>

        <hr className="my-4 border-gray-300" />

        <span className="text-gray-700">
          <strong>Borders:</strong>{' '}
          <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl p-4">
            {countryData.borders.map((country, index) => (
              <CountryCard
                key={index}
                country={{
                  name: country.commonName,
                  countryCode: country.countryCode,
                }}
              />
            ))}
          </ul>
        </span>

        <hr className="my-4 border-gray-300" />

        <div className='flex align-center justify-center gap-4'>
          <Link href={'/'} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Home
          </Link>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryInfoClient;
