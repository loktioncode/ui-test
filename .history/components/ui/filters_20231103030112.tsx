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
    selectedCategories: [] as string[],
  });

  useEffect(() => {
    const filteredData = data.filter(item => {
      const siteMatch = filters.selectedSites.length === 0 || filters.selectedSites.includes(item.sites[0].title);
      const categoryMatch = filters.selectedCategories.length === 0 || filters.selectedCategories.includes(item.categories[0].title);
      const extractMatch = !filters.extractData || item.slug.startsWith("scrape-");
      const monitorMatch = !filters.monitor || item.slug.startsWith("monitor-");
  
      // Show all items if both "monitor" and "extract" are selected
      if (filters.extractData && filters.monitor) {
        return true;
      }
  
      return siteMatch && categoryMatch && extractMatch && monitorMatch;
    });
  
    // Pass the filtered data to the parent component
    onFilterChange(filteredData);
  }, [filters, data, onFilterChange]);
  

  // Extract unique site options
  const siteOptionsSet = new Set<string>(data.flatMap(item => item.sites.map(site => site.title)));
  const siteOptions = Array.from(siteOptionsSet);


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
        <Badge
          variant={filters.extractData ? 'default' : 'outline'}
          onClick={toggleExtractData}
        >
          Extract Data
        </Badge>
      </label>

      <label>
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
                key={site}
                onSelect={() => handleSiteSelect(site)}
              >
                {site}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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

      </div>
      {filters.selectedCategories.map((category) => (
        <Badge
          key={category}
          onClick={() => removeCategory(category)}
        >
          {category}
        </Badge>
      ))}
      {filters.selectedSites.map((site) => (
        <Badge
          key={site}
          onClick={() => removeSite(site)}
        >
          {site}
        </Badge>
      ))}
    </div>
  );
}

export default Filters;
