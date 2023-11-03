import React, { useState } from 'react';

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
    category: null,
  });

  const handleFilterChange = (filter: string, value: string | boolean | string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));

    // Pass the updated filters to the parent component
    onFilterChange(filters);
  };

  // Extract unique site options
  const siteOptions = [...new Set(data.flatMap(item => item.sites.map(site => site.title)))];

  // Extract unique category options
  const categoryOptions = [...new Set(data.flatMap(item => item.categories.map(category => category.title)))];

  console.log('Site Options:', siteOptions);
  console.log('Category Options:', categoryOptions);

  return (
    <div>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge variant="solid">Sites</Badge> {/* Replace the button with a badge */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Site Selector</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          <div className="flex items-center">
            <Check size={16} className="mr-2 text-green-500" /> Status Bar
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          <div className="flex items-center">
            <X size={16} className="mr-2 text-red-500" /> Activity Bar
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          <div className="flex items-center">
            <Check size={16} className="mr-2 text-green-500" /> Panel
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
      <label>
        Extract Data:
        <input
          type="checkbox"
          checked={filters.extractData}
          onChange={(e) => handleFilterChange('extractData', e.target.checked)}
        />
      </label>

      <label>
        Monitor:
        <input
          type="checkbox"
          checked={filters.monitor}
          onChange={(e) => handleFilterChange('monitor', e.target.checked)}
        />
      </label>

      <div>
        <label>Filter by Site:</label>
        <select
          multiple
          value={filters.sites}
          onChange={(e) =>
            handleFilterChange('sites', Array.from(e.target.selectedOptions, (option) => option.value))
          }
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
          value={filters.category ?? ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All</option>
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

