import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [seasonings, setSeasonings] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(seasonings.split(',').map((s) => s.trim()));
    setSeasonings(''); // Reset input box
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
      Add up to four food seasonings (comma-separated):
        <input
          type="text"
          value={seasonings}
          onChange={(e) => setSeasonings(e.target.value)}
        />
      </label>
      <button className="custom-button" type="submit">Search Recipes</button>
    </form>
  );
};

export default Form;
