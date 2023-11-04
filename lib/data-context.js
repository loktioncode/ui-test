'use client'
import React, { createContext, useContext, useState } from 'react';


export const FilteredDataContext = createContext();


export function FilteredDataProvider({ children }) {
  const [filteredData, setFilteredData] = useState([]); 

  return (
    <FilteredDataContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </FilteredDataContext.Provider>
  );
}
