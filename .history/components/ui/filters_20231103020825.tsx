import React, { useState, useEffect } from 'react';
import { Badge } from './badge';

type Automation = {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  priority: number;
  categories: { title: string; slug: string }[];
  sites: { logoSmall2x: string; domains: string[]; title: string; slug: string }[];
};

function Filters({ data, onFilterChange }: {
  data: Automation[], onFilterChange: (filters: any) => void
}) {
  const [filters, setFilters] = useState({
    extractData: false,
    monitor: false,
    sites: [],
    category: '',
  });

  useEffect(() => {
    // Pass the updated filters to the parent component
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Extract unique site options
  const siteOptions = [...new Set(data.flatMap(item => item.sites.map(site => site.title)))] as string[];

  // Extract unique category options
  const categoryOptions = ['All', ...new Set(data.flatMap(item => item.categories.map(category => category.title)))] as string[];

  const toggleExtractData = () => {
    setFilters({ ...filters, extractData: !filters.extractData });
  };

  const toggleMonitor = () => {
    setFilters({ ...filters, monitor: !filters.monitor });
  };

  return (
    <div className='flex flex-row'>

        <Badge
          variant={filters.extractData ? 'default' : 'outline'}
          onClick={toggleExtractData}
        >
          Extract Data
        </Badge>



  
        <Badge
          variant={filters.monitor ? 'default' : 'outline'}
          onClick={toggleMonitor}
        >
          Monitor
        </Badge>


      <div>
        <label>Filter by Site:</label>
        <select
          multiple
          value={filters.sites}
          onChange={(e) => setFilters({ ...filters, sites: Array.from(e.target.selectedOptions, (option) => option.value) })}
        >
          {siteOptions.map((site) => (
            <option key={site} value={site}>
              {site}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Filter by Category:</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
