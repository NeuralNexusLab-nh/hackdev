HackDev API

This is a simple Express.js-based HTTP service deployed at: https://hackdev.nethacker.cloud

It provides several routes for testing, user information collection, and basic HTTP interactions.

Global Middleware:
- Every request automatically includes the following headers:
  - X-Developer: NetHacker
  - X-HTTP-REQUEST-ID: random numeric ID
  - Access-Control-Allow-Origin: *

Routes:

1. / 
- Method: GET
- Description: Home page, returns a simple HTML page.
- Example response:
  ```html
  <!doctype html>
  <head><title>HackDev</title></head>
  <body><h1>HackDev</h1></body>
  ```

2. /ip
- Method: GET
- Description: Returns the client IP address.
- Example response: `1.1.1.1`

3. /ua
- Method: GET
- Description: Returns the client User-Agent string.
- Example response: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...`

4. /headers
- Method: GET
- Description: Returns the full HTTP request headers from the client.
- Example response: JSON object of headers

5. /dh/register/:id
- Method: GET
- Description: Registers a new ID in the system (dh.json).
  - If the ID already exists, returns "ID already exists"
  - Otherwise, creates a new entry and returns "ID create success"
- Example URL: `https://hackdev.nethacker.cloud/dh/register/test123`

6. /dh/:id
- Method: GET
- Description: Updates data for the given ID, including IP, User-Agent, platform, mobile info, full headers, and timestamp.
- Example response: SUCCESS
- Example URL: `https://hackdev.nethacker.cloud/dh/test123`

7. /dh/info/:id
- Method: GET
- Description: Retrieves the full data for a specific ID in JSON format.
- Example URL: `https://hackdev.nethacker.cloud/dh/info/test123`

8. /xss.js
- Method: GET
- Description: Returns the xss.js file for front-end testing or injection purposes.
- Example URL: `https://hackdev.nethacker.cloud/xss.js`

9. /return
- Method: GET
- Description: Returns the "text" query parameter as plain text.
- Example URL: `https://hackdev.nethacker.cloud/return?text=Hello`
- Example response: Hello

10. /fetch
- Method: GET
- Description: Fetches a remote URL from the server and returns its text content.
- Example URL: `https://hackdev.nethacker.cloud/fetch?url=https://example.com`
- ⚠️ Warning: Use with caution. This route can potentially be used for SSRF attacks.

Notes:
-Do not use `/fetch` to **SSRF Attack**, server isn't mine.
-/dh/* router just store request's info.
-Made by NeuralNexusLab NetHacker
