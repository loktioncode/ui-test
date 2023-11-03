import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from './badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './select';

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
    selectedSites: [] as string[],
    selectedCategories: [] as string[], // Initialize as an empty array of strings for selected categories
  });

  useEffect(() => {
    // Pass the updated filters to the parent component
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Extract unique site options
  const siteOptions = data.flatMap(item => item.sites);

  // Extract unique category options
  const categoryOptions: string[] = ['All', ...(Array.from(new Set(data.flatMap(item => item.categories.map(category => category.title)))))];

  const toggleExtractData = () => {
    setFilters({ ...filters, extractData: !filters.extractData });
  };

  const toggleMonitor = () => {
    setFilters({ ...filters, monitor: !filters.monitor });
  };

  const handleCategorySelect = (selectedCategory: string) => {
    if (!filters.selectedCategories.includes(selectedCategory)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        selectedCategories: [...prevFilters.selectedCategories, selectedCategory],
      }));
    };
  };

  const removeCategory = (selectedCategory: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedCategories: prevFilters.selectedCategories.filter(category => category !== selectedCategory),
    }));
  };

  const handleSiteSelect = (selectedSite: string) => {
    if (!filters.selectedSites.includes(selectedSite)) {
      setFilters({ ...filters, selectedSites: [...filters.selectedSites, selectedSite] });
    }
  };

  const removeSite = (selectedSite: string) => {
    setFilters({ ...filters, selectedSites: filters.selectedSites.filter(site => site !== selectedSite) });
  };

  return (
    <div className='flex flex-row'>
      <label>
        Extract Data:
        <Badge
          variant={filters.extractData ? 'default' : 'outline'}
          onClick={toggleExtractData}
        >
          Extract Data
        </Badge>
      </label>

      <label>
        Monitor:
        <Badge
          variant={filters.monitor ? 'default' : 'outline'}
          onClick={toggleMonitor}
        >
          Monitor
        </Badge>
      </label>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Badge variant="default">Sites</Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by Site</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {siteOptions.map((site) => (
              <DropdownMenuItem
                key={site.title}
                onSelect={() => handleSiteSelect(site.title)}
              >
                {site.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-wrap space-x-2">
          {filters.selectedSites.map((site) => (
            <Badge
              key={site}
              onClick={() => removeSite(site)}
            >
              {site}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Badge variant="default">Categories</Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryOptions.map((category) => (
              <DropdownMenuItem
                key={category}
                onSelect={() => handleCategorySelect(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-wrap space-x-2">
          {filters.selectedCategories.map((category) => (
            <Badge
              key={category}
              onClick={() => removeCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
