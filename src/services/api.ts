import axios from 'axios';
import { Meal } from '../types/meal';
import { AreaOption } from '../types/filters';
import { generateRandomPrice } from '../lib/utils';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMeals(query: string): Promise<Meal[]> {
  const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
  return (response.data.meals || []).map((meal: Meal) => ({
    ...meal,
    price: generateRandomPrice(),
  }));
}

export async function getMealById(id: string): Promise<Meal> {
  const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  const meal = response.data.meals[0];
  return {
    ...meal,
    price: generateRandomPrice(),
    rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
  };
}

export async function getMealCategories(): Promise<string[]> {
  const response = await axios.get(`${BASE_URL}/list.php?c=list`);
  return response.data.meals.map((cat: { strCategory: string }) => cat.strCategory);
}

export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
  return (response.data.meals || []).map((meal: Meal) => ({
    ...meal,
    price: generateRandomPrice(),
  }));
}

export async function getMealAreas(): Promise<string[]> {
  const response = await axios.get(`${BASE_URL}/list.php?a=list`);
  return response.data.meals.map((area: AreaOption) => area.strArea);
}

export async function getMealsByArea(area: string): Promise<Meal[]> {
  const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
  return (response.data.meals || []).map((meal: Meal) => ({
    ...meal,
    price: generateRandomPrice(),
    rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
  }));
}