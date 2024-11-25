import { test, expect } from "@playwright/test";
import tags from "../test-data/tags.json";

test.beforeEach(async ({ page }) => {
    await page.route(
        // "https://conduit-api.bondaracademy.com/api/tags",
        "*/**/api/tags",
        async (route) => {
          // const tags = {
          //     "tags": [
          //         "Test",
          //         "Coding"
          //     ]
          // }
    
          await route.fulfill({ body: JSON.stringify(tags) });
        }
      );

      await page.route(
        "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
        async (route) => {
            const response = await route.fetch();
            const responseBody = await response.json();
            responseBody.articles[0].title = "This is a test title"
            responseBody.articles[0].description = "This is a test title"
    
            await route.fulfill({ body: JSON.stringify(responseBody) });
        }
      );
    
      await page.goto("https://conduit.bondaracademy.com/", {
        waitUntil: "networkidle",
      });
});

test("has title", async ({ page }) => {
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("app-article-list h1").first()).toContainText('This is a test title2');
  await expect(page.locator("app-article-list p").first()).toContainText('This is a test title');
});














// 1. 
// test.beforeEach(async ({ page }) => { ... });
// •  This is a Playwright test hook that runs before each test.
//  It sets up the environment for each test by executing the code inside the function.
// 2. 
// await page.route("https://conduit-api.bondaracademy.com/api/tags", async (route) => { ... });
// •  This line intercepts network requests to the specified URL. 
// The page.route method allows you to define how to handle these requests.
// 3. 
// const tags = { "tags": ["Test", "Coding"] };
// •  Here, a JavaScript object named tags is created with 
// a property tags that is an array containing the strings "Test" and "Coding".
// 4. 
// await route.fulfill({ body: JSON.stringify(tags) });
// •  This line fulfills the intercepted request by providing a mock response.
//  The tags object is converted to a JSON string and used as the response body.
// 5. 
// await page.goto("https://conduit.bondaracademy.com/", { waitUntil: "networkidle" });
// •  This navigates to the specified URL and waits until there are no more than
//  0 network connections for at least 500 ms (network idle state).

// This setup ensures that whenever the page requests the tags from the API,
// it receives the mock response with the tags "Test" and "Coding". 
// This can be useful for testing how the application handles 
// specific data without relying on the actual API.





// 1. 
// Setting up the route:

// await page.route(
// "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",

// This line sets up a route to intercept network requests to the specified URL.

// 2. 
// Defining the asynchronous callback function:

// async (route) => {

// This defines an asynchronous function that will handle the intercepted request.

// 3. 
// Fetching the original response:

// const response = await route.fetch();

// This line fetches the original response from the server for the intercepted request.

// 4. 
// Parsing the response body as JSON:

// const responseBody = await response.json();

// This parses the response body into a JSON object.

// 5. 
// Modifying the response body:

// responseBody.articles[0].title = "This is a test title";
// responseBody.articles[0].description = "This is a test title";

// These lines modify the title and description of the first article in the response body.

// 6. 
// Fulfilling the route with the modified response:

// await route.fulfill({ body: JSON.stringify(responseBody) });

// This fulfills the intercepted request with the modified response body, converting the JSON object back into a string.

// This code essentially intercepts a network request to a specific URL, fetches the original response, modifies the first 
// article's title and description, and then returns the modified response. 
// If you have any more questions or need further clarification, feel free to ask!