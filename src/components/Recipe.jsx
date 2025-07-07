import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Recipe = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        setRecipe(response.data.meals ? response.data.meals[0] : null);
      } catch (error) {
        setError("Failed to fetch recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getIngredients = () => {
    if (!recipe) return [];

    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure ? measure : ""}`);
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <p className="font-mono text-2xl">Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <p className="text-red-600 font-mono text-xl">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <p className="text-gray-600 font-mono text-xl">No recipe found. ❌</p>
      </div>
    );
  }

  return (
    <>
      {/* Full width header with background */}
      <header className="w-full bg-white py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-start">
          <h1 className="font-mono font-bold text-2xl cursor-pointer">FLAVO.</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen p-6 md:p-10 bg-white flex flex-col items-center max-w-5xl mx-auto">
        <h1 className="font-bold font-serif text-3xl md:text-5xl text-center">
          {recipe.strMeal}
        </h1>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full max-w-md md:max-w-lg mt-6 rounded-xl shadow-lg object-cover transition-all duration-500 hover:scale-105"
        />

        <h4 className="text-xl md:text-2xl font-bold font-serif text-gray-600 mt-6 text-center">
          {recipe.strArea} Dish
        </h4>

        <h2 className="text-lg md:text-xl font-semibold mt-8">Ingredients:</h2>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-200 p-6 rounded-3xl w-full max-w-4xl">
          {getIngredients().map((ingredient, index) => (
            <li
              key={index}
              className="border-b border-gray-400 last:border-none py-1 font-mono text-base"
            >
              {ingredient}
            </li>
          ))}
        </ul>

        <h2 className="font-serif mt-10 text-xl md:text-2xl text-center">
          Preparation:
        </h2>
        <div className="font-serif p-4 md:p-6 mt-4 shadow-md max-w-4xl rounded-lg bg-white">
          <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            {recipe.strInstructions}
          </p>
        </div>
      </div>

      {/* Full width footer with background */}
      <footer className="w-full bg-gray-800 py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <p className="font-mono text-sm opacity-70">
            © {new Date().getFullYear()} FLAVO. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Recipe;
