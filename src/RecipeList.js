import React, { useEffect, useState } from 'react';

const RecipeList = ({ recipes, currentPage, recipesPerPage }) => {
  const [searchPerformed, setSearchPerformed] = useState(false);

  const hasRecipes = recipes.length > 0;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    if (recipes.length > 0) {
      setSearchPerformed(true);
    }
  }, [recipes]);

  return (
    <div className="recipe-list-container">
      {searchPerformed && !hasRecipes ? (
        <p>No recipes found.</p>
      ) : (
        <div>
          {hasRecipes && <h2 className="recipe-list-heading">Recipes:</h2>}
          <ul className="recipe-list">
            {currentRecipes.map(recipe => (
              <li key={recipe.id}>
                <div className="recipe-card">
                  {recipe.image && (
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(recipe.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="image-container">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="recipe-image"
                        />
                        <div className="recipe-title-overlay">{recipe.title}</div>
                      </div>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
