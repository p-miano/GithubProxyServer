const express = require('express');
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 5000;

// Endpoint to fetch repositories
app.get('/github-repos', async (req, res) => {
    try {
        const response = await fetch('https://api.github.com/user/repos?type=all&per_page=100', {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
