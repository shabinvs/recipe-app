import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearchCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Search = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState("chicken");
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
      );
      const meals = response.data.meals || [];
      setData(meals);
      setNotFound(meals.length === 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setNotFound(true);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [item]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      setItem(query);
    }
  };

  return (
    <>
      <nav className="relative flex flex-col md:flex-row items-center px-4 md:px-6 py-3">
        <h1 className="font-mono font-bold text-2xl cursor-pointer flex-shrink-0">
          FLAVO.
        </h1>

        <div className="w-full md:w-auto mt-8 md:mt-6 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex items-center relative w-full max-w-4xl" // Increased width here
          >
            <input
              type="text"
              placeholder="Search Recipes..."
              className="w-full p-3 md:p-4 h-10 md:h-12 rounded-xl border-2 border-gray-600 font-mono text-base md:text-lg pr-10 md:pr-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2"
              aria-label="Search"
            >
              <IoSearchCircleOutline className="text-2xl md:text-3xl text-gray-600 cursor-pointer" />
            </button>
          </form>
        </div>
      </nav>

      <h1 className="text-center font-bold font-serif text-3xl md:text-4xl mt-14 text-gray-700 px-4">
        Most Loved Recipes
      </h1>
      <p className="text-center font-mono mt-3 opacity-80 px-4 max-w-xl mx-auto">
        "From Our Kitchen to Yours – Try Our Most Loved Recipes!"
      </p>

      <div className="bg-white min-h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-4 mt-8 px-2 md:px-4">
        {notFound ? (
          <p className="text-center text-gray-500 col-span-full text-xl md:text-2xl font-mono m-16 md:m-24 px-4">
            🍽️ Oops! No recipes found for "
            <span className="font-bold">{item}</span>". Try searching for
            something else!
          </p>
        ) : (
          data.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white p-4 text-center shadow-md rounded-xl cursor-pointer hover:shadow-xl transition"
            >
              <Link to={`/recipe/${meal.idMeal}`}>
                <div className="h-60 md:h-72 shadow-xl rounded-2xl overflow-hidden">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </Link>
              <h3 className="text-xl md:text-2xl mt-4 font-bold font-mono truncate">
                {meal.strMeal}
              </h3>
              <h4 className="font-serif text-sm md:text-base font-bold text-gray-500 mt-2">
                {meal.strArea} Dish
              </h4>
              <h4 className="font-serif font-bold text-gray-500 mb-2 md:mb-4 text-sm md:text-base truncate">
                Category: {meal.strCategory}
              </h4>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Search;
