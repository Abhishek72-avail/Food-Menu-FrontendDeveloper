import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { FilterState, SortOption } from '../types/filters';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { getMealAreas } from '../services/api';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

const sortOptions: SortOption[] = [
  { label: 'Name (A-Z)', value: 'name_asc' },
  { label: 'Name (Z-A)', value: 'name_desc' },
  { label: 'Rating (High to Low)', value: 'rating_high' },
  { label: 'Rating (Low to High)', value: 'rating_low' },
];

export function Filters({ onFilterChange }: FiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [areas, setAreas] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    area: '',
    sortBy: '',
    priceRange: '',
    deliveryTime: '',
  });

  useEffect(() => {
    const fetchAreas = async () => {
      const areasData = await getMealAreas();
      setAreas(areasData);
    };
    fetchAreas();
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform',
                isFilterOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Relevance</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Area Filter */}
              <div>
                <h3 className="font-medium mb-3">Filter by Area</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="area-all"
                      name="area"
                      value=""
                      checked={filters.area === ''}
                      onChange={(e) =>
                        handleFilterChange('area', e.target.value)
                      }
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="area-all" className="ml-2">
                      All Areas
                    </label>
                  </div>
                  {areas.map((area) => (
                    <div key={area} className="flex items-center">
                      <input
                        type="radio"
                        id={`area-${area}`}
                        name="area"
                        value={area}
                        checked={filters.area === area}
                        onChange={(e) =>
                          handleFilterChange('area', e.target.value)
                        }
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <label htmlFor={`area-${area}`} className="ml-2">
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  {['Under $10', '$10 - $20', '$20 - $30', 'Over $30'].map(
                    (range) => (
                      <div key={range} className="flex items-center">
                        <input
                          type="radio"
                          id={`price-${range}`}
                          name="priceRange"
                          value={range}
                          checked={filters.priceRange === range}
                          onChange={(e) =>
                            handleFilterChange('priceRange', e.target.value)
                          }
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                        />
                        <label htmlFor={`price-${range}`} className="ml-2">
                          {range}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Delivery Time Filter */}
              <div>
                <h3 className="font-medium mb-3">Delivery Time</h3>
                <div className="space-y-2">
                  {[
                    'Under 30 min',
                    '30-45 min',
                    '45-60 min',
                    'Over 60 min',
                  ].map((time) => (
                    <div key={time} className="flex items-center">
                      <input
                        type="radio"
                        id={`time-${time}`}
                        name="deliveryTime"
                        value={time}
                        checked={filters.deliveryTime === time}
                        onChange={(e) =>
                          handleFilterChange('deliveryTime', e.target.value)
                        }
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <label htmlFor={`time-${time}`} className="ml-2">
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
