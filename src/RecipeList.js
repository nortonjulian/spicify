import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Recipes:</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              {recipe && recipe.title ? (
                <div>
                   {recipe.image && (
                    <img src={recipe.image} alt={recipe.title} className='recipe-image' />
                  )}
                  <br />
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(recipe.title)}`} target="_blank" rel="noopener noreferrer">
                    {recipe.title}
                  </a>
                </div>
              ) : (
                <span>Recipe title not available</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
