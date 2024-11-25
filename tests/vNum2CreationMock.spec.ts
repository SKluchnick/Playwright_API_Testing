import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
 
  await page.goto("https://conduit.bondaracademy.com/", {
    waitUntil: "networkidle",
  });
});

test("create title 1011", async ({ page }) => {
  await page.route(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    async (route) => {
        const response = await route.fetch();
        const responseBody = await response.json();
        responseBody.articles[0].title = "This is a test title MOCK"
        responseBody.articles[0].description = "This is a test title MOCK"

        await route.fulfill({ body: JSON.stringify(responseBody) });
    }
  );
  await page.getByText('Global Feed').click()
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("app-article-list h1").first()).toContainText('This is a test title MOCK');
  await expect(page.locator("app-article-list p").first()).toContainText('This is a test title MOCK');

  await page.waitForTimeout(1000);
});

