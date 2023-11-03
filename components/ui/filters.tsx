'use client'
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from './badge';
import { ArrowLeftCircle, ArrowRightCircle, ArrowUpDown, Monitor, PlusIcon, UploadCloud, XIcon } from 'lucide-react';
import styles from './styles/filters.module.css'; // Import your CSS module
import { Automation } from '@/lib/types';
import { FilteredDataContext, FilteredDataProvider } from '@/lib/data-context'
import { useOverflowX } from '@/lib/utils';
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"


type Checked = DropdownMenuCheckboxItemProps["checked"]


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

  const [open, setOpen] = React.useState(false)
  const [openSites, setOpenSites] = React.useState(false)

  const [value, setCategoriesValue] = React.useState("")
  const [sites, setSitesValue] = React.useState([] as any)


  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)


  useEffect(() => {
    const filteredData = data.filter(item => {
      const siteMatch = filters.selectedSites.length === 0 || filters.selectedSites.includes(item.sites[0].slug);
      const categoryMatch = filters.selectedCategories.length === 0 || filters.selectedCategories.includes(item.categories[0]?.slug);
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
  const categoryOptions: string[] = [...(Array.from(new Set(data.flatMap(item => item.categories.map(category => category.slug)))))];

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

  const [overflowActive, setOverflowActive] = useState(false);
  const spanRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (spanRef.current) {
      setOverflowActive(
        spanRef.current.offsetWidth < spanRef.current.scrollWidth
      );
    }
  }, [filters]);

  const goLeft = () => {
    if (spanRef.current) {

      spanRef.current.scrollLeft -= 150;
    }
  }

  const goRight = () => {
    if (spanRef.current) {
      spanRef.current.scrollLeft += 150;
    }
  }

  return (
    <div className={`flex flex-row`}>
      {overflowActive && <div className={'cursor-pointer'} id="slideLeft" onClick={goLeft} >
        <ArrowLeftCircle className='text-purple-800'></ArrowLeftCircle>
      </div>}


      {/* ${styles.badgesContainer} */}
      <div className={`flex flex-row ${styles.menu} `} ref={spanRef} >

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
          {/* <DropdownMenu>
            <DropdownMenuTrigger>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Site</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {siteOptions.map((site) => (
                <DropdownMenuCheckboxItem
                  key={site}
                  onSelect={() => { handleSiteSelect(site), setSitesValue([...sites, site]) }}
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  {site}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Popover open={openSites} onOpenChange={setOpenSites}>
            <PopoverTrigger
            >
              <Badge
                className='m-2'
                variant={filters.selectedSites.length === 0 ? "outline" : "default"}>
                <PlusIcon height={14}></PlusIcon>
                Sites

              </Badge>

            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search sites..." />
                <CommandEmpty>No sites found.</CommandEmpty>
                <CommandGroup>
                  {siteOptions.map((site, index) => (
                    <CommandItem
                      key={index}
                      value={site}
                      onSelect={(currentValue) => {
                        handleSiteSelect(currentValue);
                         setSitesValue([...sites, currentValue])

                        setOpenSites(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          sites === site ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {site}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

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

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
            >
              <Badge
                aria-expanded={open}
                className='m-2'
                variant={filters.selectedCategories.length === 0 ? "outline" : "default"}>
                <PlusIcon height={14}></PlusIcon>
                Categories</Badge>

            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {categoryOptions.map((category, index) => (
                    <CommandItem
                      key={index}
                      value={category}
                      onSelect={(currentValue) => {
                        setCategoriesValue(currentValue)
                        handleCategorySelect(currentValue)

                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === category ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

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
      {overflowActive && <div className={'cursor-pointer'} id="slideRight" onClick={goRight}>
        <ArrowRightCircle className='text-purple-800'></ArrowRightCircle>
      </div>}
    </div>
  );
}

export default Filters;
