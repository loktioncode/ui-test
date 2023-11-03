'use client'
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from './badge';
import { ArrowLeftCircle, ArrowRightCircle, ArrowUpDown, Monitor, PlusIcon, UploadCloud, XIcon } from 'lucide-react';
import styles from './styles/filters.module.css'; // Import your CSS module
import { Automation } from '@/lib/types';
import { FilteredDataContext, FilteredDataProvider } from '@/lib/data-context'


function Filters({ data }: {
  data: Automation[]
}) {
  const [filters, setFilters] = useState({
    extractData: false,
    monitor: false,
    selectedSites: [] as string[],
    selectedCategories: [] as string[],
  });

  const { setFilteredData } = useContext(FilteredDataContext);

  useEffect(() => {
    const filteredData = data.filter(item => {
      const siteMatch = filters.selectedSites.length === 0 || filters.selectedSites.includes(item.sites[0].title);
      const categoryMatch = filters.selectedCategories.length === 0 || filters.selectedCategories.includes(item.categories[0]?.title);
      const extractMatch = !filters.extractData || item.slug.startsWith("scrape-");
      const monitorMatch = !filters.monitor || item.slug.startsWith("monitor-");

      // Show all items if both "monitor" and "extract" are selected
      if (filters.extractData && filters.monitor) {
        return true;
      }

      return siteMatch && categoryMatch && extractMatch && monitorMatch;
    });
    setFilteredData(filteredData);
  }, [filters, data, setFilteredData]);


  // Extract unique site options
  const siteOptionsSet = new Set<string>(data.flatMap(item => item.sites.map(site => site.title)));
  const siteOptions = Array.from(siteOptionsSet);


  // Extract unique category options
  const categoryOptions: string[] = [...(Array.from(new Set(data.flatMap(item => item.categories.map(category => category.title)))))];

  const toggleExtractData = () => {
    setFilters({ ...filters, extractData: !filters.extractData });
  };

  const toggleMonitor = () => {
    setFilters({ ...filters, monitor: !filters.monitor });
  };

  const handleCategorySelect = (selectedCategory: string) => {
    if (!filters.selectedCategories.includes(selectedCategory)) {
      // Clear previously selected category if any
      const newCategories = [selectedCategory];
      setFilters((prevFilters) => ({
        ...prevFilters,
        selectedCategories: newCategories,
      }));
    }
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

  const sliderRef = useRef(null);
  const scrollAmount = 100;

  return (
    <div className={`flex flex-row`}>
      <div className={` ${styles.showArrows}`} id="slideLeft" >
        <ArrowLeftCircle></ArrowLeftCircle>
      </div>
      {/* ${styles.badgesContainer} */}
      <div className={`flex flex-row  ${styles.menu} `} ref={sliderRef} >

        <label>
          <Badge
            variant={filters.extractData ? 'default' : 'outline'}
            onClick={toggleExtractData}
            className='m-2'
          >
            <ArrowUpDown height={14}></ArrowUpDown>
            Extract Data
          </Badge>
        </label>

        <label >
          <Badge
            variant={filters.monitor ? 'default' : 'outline'}
            onClick={toggleMonitor}
            className='m-2'
          >
            <Monitor height={14}></Monitor>
            Monitor
          </Badge>
        </label>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Badge
                className='m-2'
                variant={filters.selectedSites.length === 0 ? "outline" : "default"}>
                <PlusIcon height={14}></PlusIcon>
                Sites</Badge>
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
        {filters.selectedSites.map((site) => (
          <Badge
            key={site}
            className='m-2'
          >
            {site}
            <XIcon height={14} onClick={() => removeSite(site)} ></XIcon>

          </Badge>
        ))}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Badge
                className='m-2'
                variant={filters.selectedCategories.length === 0 ? "outline" : "default"}>
                <PlusIcon height={14}></PlusIcon>
                Categories</Badge>
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
            className='m-2'
          >

            {category}
            <XIcon height={14} onClick={() => removeCategory(category)}></XIcon>

          </Badge>
        ))}

      </div>
      <div className={`${styles.showArrows}`} id="slideRight">
        <ArrowRightCircle className='text-red'></ArrowRightCircle>
      </div>
    </div>
  );
}

export default Filters;
