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
  const recipesPerPage = 30;

  console.log("Current Page (FoodSeasonApp):", currentPage)


  // const handleFormSubmit = async (query, page) => {
  //   try {
  //     const encodedQuery = query.map(seasoning => encodeURIComponent(seasoning.replace(/"/g, ''))).join(',')
  //     console.log("encodedQuery", encodedQuery)
  //     const requestUrl = `https://api.spoonacular.com/food/products/search?apiKey=${apiKey}&query=${encodedQuery}&number=${recipesPerPage}&offset=${(page - 1) * recipesPerPage}`;

  //     console.log("Request URL:", requestUrl)

  //     const response = await axios.get(requestUrl)

  //     console.log("Response:", response)

  //     const recipes = response.data.products;
  //     setRecipes(recipes);
  //   } catch (error) {
  //     console.error('Error occurred:', error); // Log the error message to the console
  //   }
  // };


  // const handleFormSubmit = async (query, page) => {
  //   try {
  //     console.log("Input query:", query); // Check what's in the query array

  //     const cleanedQuery = query.map(seasoning => seasoning.trim()).filter(seasoning => seasoning !== ""); // Remove any empty strings
  //     console.log("Cleaned query:", cleanedQuery); // Check the cleaned query

  //     if (cleanedQuery.length === 0) {
  //       console.log("Empty query, skipping API call");
  //       return; // Return early if query is empty
  //     }

  //     const encodedQuery = cleanedQuery.map(seasoning => encodeURIComponent(seasoning)).join(',');
  //     console.log("encodedQuery", encodedQuery);

  //     const requestUrl = `https://api.spoonacular.com/food/products/search?apiKey=${apiKey}&query=${encodedQuery}&number=${recipesPerPage}&offset=${parseInt(page - 1) * recipesPerPage}`;
  //     console.log("Request URL:", requestUrl);

  //     const response = await axios.get(requestUrl);

  //     console.log("Response:", response);

  //     const recipes = response.data.products;
  //     setRecipes(recipes);

  //     // const totalRecipes = response.data.totalProducts;
  //     // setTotalRecipes(totalRecipes)

  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //   }
  // };

  // const handleFormSubmit = async (query, page) => {
  //   try {
  //     console.log("Input query:", query);
  //     console.log("Current page:", page);

  //     const cleanedQuery = query.map(seasoning => seasoning.trim()).filter(seasoning => seasoning !== "");
  //     console.log("Cleaned query:", cleanedQuery);

  //     if (cleanedQuery.length === 0) {
  //       console.log("Empty query, skipping API call");
  //       return;
  //     }

  //     const encodedQuery = cleanedQuery.map(seasoning => encodeURIComponent(seasoning)).join(',');
  //     console.log("encodedQuery", encodedQuery);

  //     console.log("Type of page:", typeof page);

  //     const offset = (parseInt(page) - 1) * recipesPerPage; // Adjusted calculation
  //     console.error('Calculated:', offset);
  //     const requestUrl = `https://api.spoonacular.com/food/products/search?apiKey=${apiKey}&query=${encodedQuery}&number=${recipesPerPage}&offset=${offset}`;
  //     console.log("Request URL:", requestUrl);

  //     const response = await axios.get(requestUrl);

  //     console.log("Response:", response);

  //     const recipes = response.data.products;
  //     console.log("Fetched Recipes:", recipes);
  //     setRecipes(recipes);


  //     const totalRecipes = response.data.totalProducts;
  //     setTotalRecipes(totalRecipes)
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //   }
  // };

  const handleFormSubmit = async (query, page) => {
    try {
      console.log("Input query:", query);
      console.log("Current page:", page);

      const cleanedQuery = query.map(seasoning => seasoning.trim()).filter(seasoning => seasoning !== "");
      console.log("Cleaned query:", cleanedQuery);

      if (cleanedQuery.length === 0) {
        console.log("Empty query, skipping API call");
        return;
      }

      const formattedQuery = cleanedQuery.join(',+')
      console.log(formattedQuery)

      const recipesPromises = cleanedQuery.map(async (ingredient) => {
        // const requestUrl = `https://api.spoonacular.com/food/products/search?apiKey=${apiKey}&query=${encodeURIComponent(ingredient)}&number=${recipesPerPage}&offset=${(page - 1) * recipesPerPage}`;
        // const requestUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=96acacd9967d40b0913b72826ac7f9ba&ingredients=apples,+flour,+sugar&number=2`;
        const requestUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${formattedQuery}&number=${recipesPerPage}`;
        console.log("Request URL:", requestUrl);
        const response = await axios.get(requestUrl);
        console.log("API Response:",response.data)
        return response.data;
      });

      const recipesResults = await Promise.all(recipesPromises);
      console.log("Recipes Results:", recipesResults);

      // Find the intersection of recipe sets
      // const commonRecipes = recipesResults.reduce((intersection, recipesSet) => {
      //   return intersection.filter(recipe => recipesSet.some(r => r.id === recipe.id));
      // }, recipesResults[0]);

      // console.log("Common Recipes:", commonRecipes);

      setRecipes(recipesResults);

      const totalRecipes = recipesResults.length; // Set totalRecipes based on the common recipes
      setTotalRecipes(totalRecipes);
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
