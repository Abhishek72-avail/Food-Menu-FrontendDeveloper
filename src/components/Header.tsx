// import React from 'react';
import { Search, MapPin, ChevronDown, UtensilsCrossed, ShoppingBag, User, LogIn } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-orange-500">FoodieHub</span>
            </div>
            
            {/* Location Selector */}
            <button className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-orange-500 border-b-2 border-black pb-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Vadodara,Gujarat</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-8 ml-auto">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for restaurant, cuisine or a dish"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
                <ShoppingBag className="h-5 w-5" />
                <span>Cart</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </a>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Order Now
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}