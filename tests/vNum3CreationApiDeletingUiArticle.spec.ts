import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
 
  await page.goto("https://conduit.bondaracademy.com/", {
    waitUntil: "networkidle",
  });

  await page.getByText('Sign in').click();
  await page.getByRole('textbox',{name:'Email'}).fill('l_w_d@i.ua');
  await page.getByRole('textbox',{name:'Password'}).fill('l_w_d@i.ua');
  await page.getByRole('button').click();

});


test("createDeleteArticle(API-UI)", async ({ page,request }) => {
 const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
    data:{
      "user":{"email":"l_w_d@i.ua","password":"l_w_d@i.ua"}
    }

  })
const responseBody = await response.json();
const accesToken = responseBody.user.token
console.log(responseBody.user.token)

const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
  data:{
    "article":{"title":"OneNew1232","description":"TwoNew1232","body":"ThreeNew1232","tagList":[]}
  },
  headers :{
    Authorization: `Token ${accesToken}`
  }
})

expect(articleResponse.status()).toEqual(201);

await page.getByText('Global Feed').click();
await page.getByText('OneNew1232').click();
await page.getByRole('button',{name:"Delete Article"}).first().click();
await expect(page.locator("app-article-list h1").first()).not.toContainText('OneNew1232');
  
});

