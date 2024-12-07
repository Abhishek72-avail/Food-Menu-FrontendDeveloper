import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { MealCard } from './components/MealCard';
import { MealModal } from './components/MealModal';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';
import { searchMeals, getMealsByArea, getMealById } from './services/api';
import { Meal } from './types/meal';
import { FilterState } from './types/filters';
import { Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    area: 'Indian',  // Default to Indian cuisine
    sortBy: '',
    priceRange: '',
    deliveryTime: '',
  });

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        let mealsData: Meal[];
        if (searchQuery) {
          mealsData = await searchMeals(searchQuery);
        } else if (filters.area) {
          mealsData = await getMealsByArea(filters.area);
        } else {
          mealsData = await searchMeals('');
        }

        // Apply sorting
        if (filters.sortBy) {
          mealsData = [...mealsData].sort((a, b) => {
            switch (filters.sortBy) {
              case 'name_asc':
                return a.strMeal.localeCompare(b.strMeal);
              case 'name_desc':
                return b.strMeal.localeCompare(a.strMeal);
              case 'rating_high':
                return (b.rating || 0) - (a.rating || 0);
              case 'rating_low':
                return (a.rating || 0) - (b.rating || 0);
              default:
                return 0;
            }
          });
        }

        // Add random ratings if not present
        mealsData = mealsData.map(meal => ({
          ...meal,
          rating: meal.rating || Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
        }));

        setMeals(mealsData || []);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching meals:', error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchMeals, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filters]);

  const handleMealClick = async (meal: Meal) => {
    try {
      const fullMealDetails = await getMealById(meal.idMeal);
      setSelectedMeal(fullMealDetails);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  // Pagination
  const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMeals = meals.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main>
        <Filters onFilterChange={setFilters} />

        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
          ) : currentMeals.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentMeals.map((meal) => (
                  <MealCard 
                    key={meal.idMeal} 
                    meal={meal}
                    onClick={() => handleMealClick(meal)}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700">No meals found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>

      {selectedMeal && (
        <MealModal
          meal={selectedMeal}
          isOpen={!!selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;