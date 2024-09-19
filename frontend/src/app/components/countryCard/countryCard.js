import Link from "next/link";

export default function CountryCard({country}) {
    return (
        <li className="flex items-center justify-center text-center p-4 min-w-10 max-h-14 border rounded-lg bg-gray-800 border-gray-700 shadow-lg transition-transform transform hover:scale-105">
            <Link href={`/countries/${country.name.toLowerCase()}/${country.countryCode}`} className="text-gray-100 hover:text-blue-400">
                {country.name}
            </Link>
        </li>
    )
}