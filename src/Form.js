import React, { useState } from 'react';

const Form = ({ onSubmit, currentPage }) => {
  const [seasonings, setSeasonings] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Current Page (Form):", currentPage)

    onSubmit(seasonings.split(',').map((s) => s.trim()), currentPage);
    setSeasonings(''); // Reset input box
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter food seasonings (comma-separated):
        <input
          type="text"
          value={seasonings}
          onChange={(e) => setSeasonings(e.target.value)}
        />
      </label>
      <button type="submit">Search Recipes</button>
    </form>
  );
};

export default Form;
