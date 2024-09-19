"use client";
import { useEffect, useState } from 'react';
import { getCountries } from './services/countryService';
import CountryCard from './components/countryCard/countryCard';

export default function HomePage() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCountries() {
            try {
                const data = await getCountries();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setError('Failed to load countries');
            } finally {
                setLoading(false);
            }
        }

        fetchCountries();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <span className="text-red-500 text-2xl font-semibold">{error}</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-100 shadow-md p-4 rounded-md bg-gray-800 border-2 border-gray-300">Countries</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-6xl p-4">
                {countries.length > 0 ? (
                    countries.map((country) => (
                       <CountryCard key={country.countryCode} country={country}/>
                    ))
                ) : (
                    <p className="text-gray-400">No countries available.</p>
                )}
            </ul>
        </div>
    );
}
