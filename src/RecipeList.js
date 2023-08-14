import React from 'react';

const RecipeList = ({ recipes }) => {
  console.log("Recipes in RecipeList:", recipes)
  return (
    <div>
      <h2>Recipes:</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ol>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              {recipe && recipe.title ? (
                <a href={`https://www.google.com/search?q=${encodeURIComponent(recipe.title)}`} target="_blank" rel="noopener noreferrer">
                  {recipe.title}
                </a>
              ) : (
                <span>Recipe title not available</span>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default RecipeList;
