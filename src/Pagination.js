import React from 'react';

const Pagination = ({ currentPage, totalRecipes, recipesPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRecipes.length / recipesPerPage);
  const hasMoreResults = totalRecipes === recipesPerPage * currentPage;

  console.log("currentPage:", currentPage);
  console.log("totalRecipes:", totalRecipes);
  console.log("recipesPerPage:", recipesPerPage);
  console.log("totalPages:", totalPages);

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  }

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  // const hasNextPage = (currentPage * recipesPerPage) < recipesCount;

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={handlePrevPage}>Previous</button>
      )}
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
        key={index + 1}
        onClick={() => onPageChange(index + 1)}
        className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
      {hasMoreResults && (
        <button onClick={handleNextPage}>Next</button>
      )}
    </div>
  );
};


export default Pagination;
