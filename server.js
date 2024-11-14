let cachedLanguagesData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

app.get('/github-languages', async (req, res) => {
    const now = Date.now();
    
    if (cachedLanguagesData && (now - lastFetchTime < CACHE_DURATION)) {
        // Return cached data if it's still valid
        return res.json(cachedLanguagesData);
    }

    try {
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

        for (const repo of repos) {
            const languagesResponse = await fetch(repo.languages_url, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                }
            });

            if (languagesResponse.ok) {
                const repoLanguages = await languagesResponse.json();
                for (const [language, count] of Object.entries(repoLanguages)) {
                    languagesData[language] = (languagesData[language] || 0) + count;
                }
            } else {
                console.error(`Failed to fetch languages for repo: ${repo.name}`);
            }
        }

        // Cache the data and update the fetch time
        cachedLanguagesData = languagesData;
        lastFetchTime = now;

        res.json(languagesData);
    } catch (error) {
        console.error('Error fetching languages or repositories:', error);
        res.status(500).json({ error: 'Failed to fetch language data' });
    }
});
