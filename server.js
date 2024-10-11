import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 5000;

// Root route to display a simple message
app.get('/', (req, res) => {
    res.send('Welcome to the GitHub Proxy Server!');
});

// Endpoint to fetch languages from all repositories
app.get('/github-languages', async (req, res) => {
    try {
        // Fetch all repositories
        const response = await fetch('https://api.github.com/user/repos?type=all&per_page=100', {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch repositories: ${response.statusText}`);
        }

        const repos = await response.json();
        const languagesData = {};

        // Fetch languages for each repository
        for (const repo of repos) {
            const languagesResponse = await fetch(repo.languages_url, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                }
            });

            if (languagesResponse.ok) {
                const repoLanguages = await languagesResponse.json();
                for (const [language, count] of Object.entries(repoLanguages)) {
                    // Aggregate the total byte count for each language across all repos
                    languagesData[language] = (languagesData[language] || 0) + count;
                }
            } else {
                console.error(`Failed to fetch languages for repo: ${repo.name}`);
            }
        }

        res.json(languagesData);
    } catch (error) {
        console.error('Error fetching languages or repositories:', error);
        res.status(500).json({ error: 'Failed to fetch language data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
