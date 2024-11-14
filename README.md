# GitHub Proxy Server

This is a simple Node.js server that acts as a proxy for fetching language data from your GitHub repositories. The purpose of this project is to securely aggregate language usage across all your private and public repositories without exposing sensitive information such as tokens.

## Features
- **Fetch GitHub Language Data**: Aggregates the total usage of programming languages across all repositories.
- **Secure Access**: The GitHub token is managed securely via Render's environment variables and is never exposed in the public repository.
- **REST API**: Provides a RESTful endpoint to access the language data in a structured format.
- **Caching**: Implements a caching mechanism to reduce API calls and enhance response times.

## How It Works
The server uses Express.js to create a REST API and `node-fetch` to make calls to the GitHub API. The main endpoint `/github-languages` aggregates the number of bytes for each programming language used across all the user's repositories.

## Getting Started

### Prerequisites
- **Node.js** (v14 or above)
- **npm** (Node Package Manager)

### Installation
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/github-proxy-server.git
   cd github-proxy-server
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your GitHub token:
   ```sh
   GITHUB_TOKEN=your_github_token_here
   ```

   Make sure this file is listed in `.gitignore` so it is not committed.

### Running the Server
You can run the server locally by executing the following command:

```sh
node server.js
```

The server will start on port 5000 by default. You can visit `http://localhost:5000` to see the welcome message.

### Deploying to Render
This project is intended to be deployed on [Render](https://render.com/).

1. **Create a Web Service on Render**:
   - Link your GitHub repository.
   - Set up the environment variable `GITHUB_TOKEN` in Render's dashboard.

2. **Build and Start Commands**:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### Endpoints
- **`GET /`**: Displays a welcome message.
- **`GET /github-languages`**: Fetches and returns an aggregated list of programming languages used across all GitHub repositories, including the total number of bytes for each language.

### Example Response
```json
{
  "JavaScript": 1614369,
  "HTML": 302332,
  "CSS": 532009,
  "C#": 1207031,
  "Python": 48346,
  "Java": 159907
}
```

## Security Considerations
- The GitHub token used for accessing repository data is never exposed in the codebase. It is injected as an environment variable by the deployment platform (Render).
- The repository does not expose sensitive repository details; instead, it aggregates language usage to minimize the risk of exposing sensitive data.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to [Render](https://render.com/) for providing free hosting options for small projects.
- Special thanks to the contributors of `node-fetch` and `express` for making this project possible.
