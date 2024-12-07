// import React from 'react';
import { X, Star, Clock, DollarSign } from 'lucide-react';
import { Meal } from '../types/meal';
// import { cn } from '../lib/utils';

interface MealModalProps {
  meal: Meal;
  isOpen: boolean;
  onClose: () => void;
}

export function MealModal({ meal, isOpen, onClose }: MealModalProps) {
  if (!isOpen) return null;

  const ingredients = [];
  for (let i = 1; i <= 5; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];
    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-[300px]">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:pr-8">
            <h2 className="text-2xl font-bold mb-2">{meal.strMeal}</h2>
            <p className="text-gray-600 mb-4">{meal.strCategory}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{meal.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>{meal.deliveryTime || '30-45 min'}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <span>${meal.price}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">{ingredient}</li>
                ))}
              </ul>
            </div>

            {meal.strInstructions && (
              <div>
                <h3 className="font-semibold mb-2">Preparation</h3>
                <p className="text-gray-600 text-sm line-clamp-4">{meal.strInstructions}</p>
              </div>
            )}

            <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}