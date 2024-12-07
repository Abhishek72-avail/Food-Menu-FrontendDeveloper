export interface FilterState {
  area: string;
  sortBy: 'name_asc' | 'name_desc' | 'rating_high' | 'rating_low' | '';
  priceRange: string;
  deliveryTime: string;
}

export interface SortOption {
  label: string;
  value: FilterState['sortBy'];
}

export interface AreaOption {
  strArea: string;
}