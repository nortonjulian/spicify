import React, { useEffect, useState } from 'react';

const RecipeList = ({ recipes }) => {
  const [searchPerformed, setSearchPerformed] = useState(false);

  const hasRecipes = recipes.length > 0;

  const groupedRecipes = {};
  recipes.forEach(recipe => {
    const firstLetter = recipe.title.charAt(0).toUpperCase();
    if (!groupedRecipes[firstLetter]) {
      groupedRecipes[firstLetter] = [];
    }
    groupedRecipes[firstLetter].push(recipe);
  });

  useEffect(() => {
    if (recipes.length > 0) {
      setSearchPerformed(true);
    }
  }, [recipes])

  return (
    <div>
      {searchPerformed && !hasRecipes ? (
        <p>No recipes found.</p>
      ) : (
        <div>
          {hasRecipes && <h2>Recipes:</h2>}
          {Object.keys(groupedRecipes).map(letter => (
            <div key={letter}>
              <h3>{letter}</h3>
              <ul>
                {groupedRecipes[letter].map(recipe => (
                  <li key={recipe.id}>
                    {recipe && recipe.title ? (
                      <div>
                        {recipe.image && (
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(recipe.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="recipe-image"
                            />
                          </a>
                        )}
                        <br />
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(recipe.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {recipe.title}
                        </a>
                      </div>
                    ) : (
                      <span>Recipe title not available</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
