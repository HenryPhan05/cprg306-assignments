"use client";

import { useState, useEffect } from "react";

type Meal = {
  id: string;
  name: string;
  image?: string;
};

interface MealIdeasProps {
  ingredient: string;
}

function MealIdeas({ ingredient }: MealIdeasProps) {
  // State to hold fetched meals
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  type MealAPIResponse = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
  // Fetch meals whenever the ingredient changes
  useEffect(() => {
    if (!ingredient) {
      setMeals([]);
      return;
    }

    const fetchMeals = async () => {
      setLoading(true);
      setError(null);

      try {
        // Example API endpoint (replace with your actual API)
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        const data = await response.json();

        // Assuming data.meals is an array of meals
        if (data.meals) {
          const formattedMeals: Meal[] = data.meals.map((m: MealAPIResponse) => ({
            id: m.idMeal,
            name: m.strMeal,
            image: m.strMealThumb,
          }));
          setMeals(formattedMeals);
        } else {
          setMeals([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch meals.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [ingredient]);

  return (
    <div className="mt-4 bg-white text-black text-center rounded-xl">
      <h2 className="text-4xl font-semibold mb-2">Meal Ideas for: {ingredient}</h2>

      {loading && <p>Loading meals...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {meals.length === 0 && !loading && !error && <p>No meals found.</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <li key={meal.id} className="border rounded p-2 shadow hover:shadow-lg transition">
            <img src={meal.image} alt={meal.name} className="w-full h-32 object-cover rounded" />
            <h3 className="mt-2 font-medium">{meal.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealIdeas;