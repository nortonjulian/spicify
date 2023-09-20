import React, { useEffect, useState } from 'react';
import Form from './Form';
import RecipeList from './RecipeList';
import Pagination from './Pagination';
import axios from 'axios';

// const apiKey = '96acacd9967d40b0913b72826ac7f9ba';

const FoodSeasoningApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState([]);
  const recipesPerPage = 10;

  const handleFormSubmit = async (query) => {
    console.log('Query submitted:', query)
    setQuery(query);
    setCurrentPage(1);
    try {

      const cleanedQuery = query.map(seasoning => seasoning.trim()).filter(seasoning => seasoning !== "");
      // console.log("Cleaned query:", cleanedQuery);

      if (cleanedQuery.length === 0) {
        console.log("Empty query, skipping API call");
        return;
      }

      const formattedQuery = cleanedQuery.join(',+')
      console.log(formattedQuery)

      // const requestUrl = '/api/spoonacular?seasonings=' + formattedQuery;
      const requestUrl = 'http://localhost:5001/api/spoonacular?seasonings=' + formattedQuery;

      // const requestUrl = `/api/recipes?ingredients=${formattedQuery}`;
      // const requestUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${formattedQuery}&number=100`;
      // const requestUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${formattedQuery}`;

      console.log("Request URL:", requestUrl);

      console.log('Before making API call...');
      const response = await axios.get(requestUrl).catch(error => {
        console.error('Axios error:', error.message);
        console.error('Axios response data:', error.response.data);
      });

      console.log('API Response:', response);
      console.log('API Response Data:', response.data);


      const recipesReturned = response.data;
      console.log("Recipes Returned:", recipesReturned);

      // const sortedRecipes = recipesReturned.sort((a, b) => a.title.localeCompare(b.title));


      setRecipes(recipesReturned);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    handleFormSubmit([])
  }, [])


  return (
    <div>
      <h2>Unlock Culinary Creativity: Your Leftover Seasonings, Endless Recipes!</h2>
      <Form onSubmit={handleFormSubmit} />
      <RecipeList recipes={recipes} currentPage={currentPage} recipesPerPage={recipesPerPage} heading={`Displaying Recipes with the ingredients of: ${query.join(', ')}`} />
       <Pagination
        currentPage={currentPage}
        totalRecipes={recipes.length}
        recipesPerPage={recipesPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default FoodSeasoningApp;
