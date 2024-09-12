"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCountries } from './services/countryService';

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
                    countries.map((country, index) => (
                        <li key={country.countryCode} className="flex items-center justify-center text-center p-4 max-h-14 border rounded-lg bg-gray-800 border-gray-700 shadow-lg transition-transform transform hover:scale-105">
                            <Link href={`/countries/${country.name.toLowerCase()}/${country.countryCode}`} className="text-gray-100 hover:text-blue-400">
                                {country.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-400">No countries available.</p>
                )}
            </ul>
        </div>
    );
}
