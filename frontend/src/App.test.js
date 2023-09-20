import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App.js';

test('renders App component', () => {
  // Render the App component
  render(<App />);

  // Use screen queries to check if elements are present in the rendered output
  const appTitle = screen.getByText(/Spicify/i); // Change this to match your actual title
  // const foodSeasoningApp = screen.getByTestId('food-seasoning-app'); // Use data-testid to locate your child component

  // Perform assertions
  expect(appTitle).toBeInTheDocument();
  // expect(foodSeasoningApp).toBeInTheDocument();
});
