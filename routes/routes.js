const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/spoonacular', async(req, res) => {
    try {
        console.log('Request Query:', req.query);
        const { seasonings } = req.query;

        console.log('Received seasonings:', seasonings);
        console.log('Received query:', req.query);

        if (!seasonings) {
            return res.status(400).json({message: 'Seasonings parameter is required.' });
        }

        const apiKey = '96acacd9967d40b0913b72826ac7f9ba';
        const formattedQuery = encodeURIComponent(seasonings.replace(/, \s*/g, ',+'));

        // const requestUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${formattedQuery}&number=100`;
        const requestUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&ingredients=" + formattedQuery + "&number=100";

        console.log('Request URL:', requestUrl);

        const response = await axios.get(requestUrl);
        const recipesReturned = response.data;
        const sortedRecipes = recipesReturned.sort((a, b) => a.title.localeCompare(b.title));

        res.json(sortedRecipes);
    } catch (error) {
        console.log('Error occurred:', error.message);
        res.status(500).json({ message: 'An error occurred.' });
    }
})

module.exports = router;
