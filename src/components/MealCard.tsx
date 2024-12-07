// import React from 'react';
import { Meal } from '../types/meal';
import { Star, Clock, DollarSign } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
  onClick: () => void;
}

export function MealCard({ meal, onClick }: MealCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
          <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-orange-500 px-4 py-2 rounded-lg font-medium">
            Quick View
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{meal.strMeal}</h3>
        <p className="text-gray-600 text-sm mb-3">{meal.strCategory}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{meal.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">30-45 min</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-gray-600" />
            <span className="font-bold text-gray-900">${meal.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}