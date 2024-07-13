# URL Shortener Microservice

This project is a URL Shortener Microservice built with Node.js, Express, and MongoDB. The application allows you to shorten URLs and redirect short URLs to their original URLs.

## Live Demo

You can see a live demo of the application here: [URL Shortener Microservice](https://url-shortener.hackimtech.com)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/hackim18/Backend-URL-Shortener-Microservice
   cd Backend-URL-Shortener-Microservice
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Create a .env file** in the root of the project and add the following lines:

   ```sh
   PORT=3000
   DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. **Start the server**:
   ```sh
   npm start
   ```

The application will be running on http://localhost:3000.

## Usage

To use the URL Shortener Microservice, you can make requests to the following endpoints:

## API Endpoints

1. **Root Endpoint**

   - URL: /
   - Method: GET
   - Description: Serves the homepage of the application.
   - Example: http://localhost:3000/

2. **Hello API**

   - URL: /api/hello
   - Method: GET
   - Description: Returns a greeting message in JSON format.
   - Example: http://localhost:3000/api/hello
   - Response:
     ```json
     {
       "greeting": "hello API"
     }
     ```

3. **Shorten URL**

   - URL: /api/shorturl
   - Method: POST
   - Description: Accepts a URL and returns a shortened URL.
   - Request Body:
     ```json
     {
       "url": "https://www.example.com"
     }
     ```
   - Example: http://localhost:3000/api/shorturl
   - Response:
     ```json
     {
       "original_url": "https://www.example.com",
       "short_url": 1
     }
     ```
   - Notes:
     - The URL should be valid.
     - If the URL is invalid, the response will be:
       ```json
       {
         "error": "Invalid URL"
       }
       ```

4. **Redirect Short URL**
   - URL: /api/shorturl/:short_url
   - Method: GET
   - Description: Redirects to the original URL based on the shortened URL.
   - Example: http://localhost:3000/api/shorturl/1
   - Notes:
     - If the shortened URL does not exist, the response will be:
       ```json
       {
         "error": "URL NOT FOUND"
       }
       ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
