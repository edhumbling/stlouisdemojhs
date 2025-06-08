import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface School {
  id: number;
  name: string;
  location: string;
  image: string;
}

const SHSDatabasePage: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('https://schoolsingh.com/schools/senior-high-schools');
        const $ = cheerio.load(response.data);
        const schoolsData: School[] = [];

        // Example scraping logic (adjust selectors based on actual HTML structure)
        $('.school-card').each((index, element) => {
          const name = $(element).find('.school-name').text().trim();
          const location = $(element).find('.school-location').text().trim();
          const image = $(element).find('.school-image').attr('src') || 'https://example.com/placeholder.jpg';

          schoolsData.push({
            id: index + 1,
            name,
            location,
            image,
          });
        });

        setSchools(schoolsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch schools data. Please try again later.');
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || school.location === filter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-8 bg-green-600 text-white text-center shadow-lg mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-lg">Ghana Senior High Schools Database</h1>
        <p className="mt-2 text-lg sm:text-xl font-medium text-green-100/90 drop-shadow">Explore all SHS in Ghana with details, images, and more. Data sourced from schoolsingh.com</p>
      </header>

      {/* Search and Filter */}
      <section className="w-full px-4 sm:px-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search schools..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="Region 1">Region 1</option>
            <option value="Region 2">Region 2</option>
            <option value="Region 3">Region 3</option>
          </select>
        </div>
      </section>

      {/* SHS Content Grid */}
      <section className="w-full px-2 sm:px-6 pb-12">
        {loading ? (
          <div className="text-center text-gray-500 mt-10 text-lg font-medium">Loading Senior High Schools data...</div>
        ) : error ? (
          <div className="text-center text-red-500 mt-10 text-lg font-medium">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSchools.map(school => (
              <div key={school.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src={school.image} alt={school.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">{school.name}</h3>
                  <p className="text-gray-600">{school.location}</p>
                  <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SHSDatabasePage; 