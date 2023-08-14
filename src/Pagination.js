import React from 'react';

const Pagination = ({ currentPage, recipesPerPage, totalRecipes, onPageChange }) => {
    const totalPages = Math.ceil(totalRecipes / recipesPerPage);

    const handleNextPage = () => {
      onPageChange(currentPage + 1)
    };

    return (
      <div className="pagination">
        {currentPage < totalPages && (
          <button onClick={handleNextPage}>Next</button>
        )}
      </div>
    );
  };

export default Pagination;
