import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
 
  await page.goto("https://conduit.bondaracademy.com/", {
    waitUntil: "networkidle",
  });

  // await page.getByText('Sign in').click();
  // await page.getByRole('textbox',{name:'Email'}).fill('l_w_d@i.ua');
  // await page.getByRole('textbox',{name:'Password'}).fill('l_w_d@i.ua');
  // await page.getByRole('button').click();
});




test("createDeleteArticle(UI-API)", async ({ page,request }) => {
  await page.getByText('New Article').click();
  await page.getByRole('textbox',{name:'Article Title'}).click();
  await page.getByRole('textbox',{name:'Article Title'}).fill('Hello');
  await page.getByRole('textbox',{name:'What\'s this article about?'}).fill('Hello');
  await page.getByRole('textbox',{name:'Write your article (in markdown)'}).fill('Hello');
  await page.getByRole('button',{name:'Publish Article'}).click();

  const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
  const areticleResponseBody = await articleResponse.json();
  const slugId = areticleResponseBody.article.slug

  await expect(page.locator(".article-page h1").first()).toContainText('Hello')

  await page.getByText('Home').click();
  await page.getByText('Global Feed').click();
  await expect(page.locator("app-article-list h1").first()).toContainText('Hello');

  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
    data:{
      "user":{"email":"l_w_d@i.ua","password":"l_w_d@i.ua"}
    }

  })
const responseBody = await response.json();
const accesToken = responseBody.user.token
console.log(responseBody)


const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`,{
   headers :{
    Authorization: `Token ${accesToken}`
  }
})

expect(deleteResponse.status()).toEqual(204)

});