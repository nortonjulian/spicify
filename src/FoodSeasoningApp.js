import React, { useEffect, useState } from 'react';
import Form from './Form';
import RecipeList from './RecipeList';
import Pagination from './Pagination'
import axios from 'axios';

const apiKey = '96acacd9967d40b0913b72826ac7f9ba';

const FoodSeasoningApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  console.log("Current Page (FoodSeasonApp):", currentPage)

  const handleFormSubmit = async (query, page) => {
    try {
      // console.log("Input query:", query);
      // console.log("Current page:", page);

      const cleanedQuery = query.map(seasoning => seasoning.trim()).filter(seasoning => seasoning !== "");
      // console.log("Cleaned query:", cleanedQuery);

      if (cleanedQuery.length === 0) {
        console.log("Empty query, skipping API call");
        return;
      }

      const formattedQuery = cleanedQuery.join(',+')
      console.log(formattedQuery)

      const recipesPromises = cleanedQuery.map(async (ingredient) => {
        const requestUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${formattedQuery}&number=${recipesPerPage}&offset=${(page - 1) * recipesPerPage}`;
        const response = await axios.get(requestUrl);
        return response.data;
      });

      const recipesResults = await Promise.all(recipesPromises);

      const flattenedRecipes = recipesResults.flatMap((recipesSet) => recipesSet);

      setRecipes(flattenedRecipes);
      setTotalRecipes(flattenedRecipes.length);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    console.log("Current Page:", currentPage);
    handleFormSubmit([], parseInt(currentPage));
  }, [currentPage])

  const handlePageChange = (newPage) => {
    console.log("Changing page to:", newPage)
    setCurrentPage(newPage);
    handleFormSubmit([], newPage);
  };

  return (
    <div>
      <h1>Food Seasoning App</h1>
      <Form onSubmit={handleFormSubmit} currentPage={currentPage} />
      <RecipeList recipes={recipes} recipesPerPage={recipesPerPage} />
      <Pagination
        currentPage={currentPage}
        recipesPerPage={recipesPerPage}
        totalRecipes={totalRecipes}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FoodSeasoningApp;
