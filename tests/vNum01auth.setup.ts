import { test as setup} from "@playwright/test";
import user from '../.auth/user.json'
import fs from 'fs'
import { json } from "stream/consumers";

const authFile = '.auth/user.json'


// setup ('auth',async({page})=>{
//     await page.goto("https://conduit.bondaracademy.com/", {
//         waitUntil: "networkidle",
//       });
//   await page.getByText('Sign in').click();
//   await page.getByRole('textbox',{name:'Email'}).fill('l_w_d@i.ua');
//   await page.getByRole('textbox',{name:'Password'}).fill('l_w_d@i.ua');
//   await page.getByRole('button').click();

//   await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

//   await page.context().storageState({path:authFile})

  
// });



setup ('auth',async({request})=>{
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
    data:{
      "user":{"email":"l_w_d@i.ua","password":"l_w_d@i.ua"}
    }

  })
const responseBody = await response.json();
const accesToken = responseBody.user.token
console.log(responseBody)

user.origins[0].localStorage[0].value = accesToken
fs.writeFileSync(authFile,JSON.stringify(user))

process.env['ACCESS_TOKEN'] = accesToken
});









// ? **************************************************************************


// 1. 
// Importing the test function from Playwright:

// import { test as setup } from "@playwright/test";

// This line imports the test function from the Playwright testing 
// library and renames it to setup for use in this script.

// 2. 
// Defining the path for the authentication file:

// const authFile = '.auth/user.json';

// This line sets the path where the authentication state will be saved. 
// The file will store the user's login state.

// 3. 
// Setting up the test:

// setup('auth', async ({ page }) => {

// This line defines a test named 'auth' using the setup function. 
// The test is asynchronous and takes a page object as an argument, which represents a browser page.

// 4. 
// Navigating to the website:

// await page.goto("https://conduit.bondaracademy.com/", {
// waitUntil: "networkidle",
// });

// This line navigates to the specified URL and waits until there are no 
// more than 0 network connections for at least 500 ms (network idle).

// 5. 
// Clicking the 'Sign in' button:

// await page.getByText('Sign in').click();

// This line finds the 'Sign in' button on the page by its text and clicks it.

// 6. 
// Filling in the email field:

// await page.getByRole('textbox', { name: 'email' }).fill('l_w_d@i.ua');

// This line finds the email input field by its role and name, then fills it with 
// the specified email address.

// 7. 
// Filling in the password field:

// await page.getByRole('textbox', { name: 'password' }).fill('l_w_d@i.ua');

// This line finds the password input field by its role and name, then 
// fills it with the specified password.

// 8. 
// Clicking the login button:

// await page.getByRole('button').click();

// This line finds the login button by its role and clicks it to submit the login form.

// 9. 
// Waiting for a specific network response:

// await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags');

// This line waits for a network response from the specified URL, 
// ensuring that the login process is complete and the page has loaded necessary data.

// 10. 
// Saving the authentication state:

// await page.context().storageState({ path: authFile });

// This line saves the current state of the browser context 
// (including cookies and local storage) to the specified file, 
// allowing for reuse in future tests.


// ? **************************************************************************


// {
//   user: {
//     email: 'l_w_d@i.ua',
//     username: 'Serg',
//     bio: null,
//     image: 'https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1NDQwfSwiaWF0IjoxNzMxODM4MTUyLCJleHAiOjE3MzcwMjIxNTJ9.2lPWYK865aJ67tdQDBEBa6lN1mGiWVp1TMtb66Ewzgw'
//   }
// }


// {
//   "cookies": [],
//   "origins": [
//     {
//       "origin": "https://conduit.bondaracademy.com",
//       "localStorage": [
//         {
//           "name": "jwtToken",
//           "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1NDQwfSwiaWF0IjoxNzMxODM4MTQwLCJleHAiOjE3MzcwMjIxNDB9.S8qw_MG0GZDK1OnDFyxoSK0pQ44utzoyuibPaKn4Up4"
//         }
//       ]
//     }
//   ]
// }



// 1. 
// Importing necessary modules:

// import { test as setup } from "@playwright/test";
// import user from '../.auth/user.json';
// import fs from 'fs';
// import { json } from "stream/consumers";

// •  import { test as setup } from "@playwright/test";
// Imports the test function from Playwright and renames it to setup.

// •  import user from '../.auth/user.json';
// : Imports the user authentication data from a JSON file.

// •  import fs from 'fs';
// : Imports the file system module to read and write files.

// •  import { json } from "stream/consumers";
// : Imports the json function from the stream/consumers module
//  (though this import is not used in the code).

// 2. 
// Defining the path for the authentication file:

// const authFile = '.auth/user.json';

// This line sets the path where the authentication state will be saved.

// 3. 
// Setting up the test:

// setup('auth', async ({ request }) => {

// This line defines a test named 'auth' 
// using the setup function. The test is asynchronous and takes 
// a request object as an argument, which represents an HTTP request.

// 4. 
// Sending a POST request to log in:

// const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
// data: {
// "user": { "email": "l_w_d@i.ua", "password": "l_w_d" }
// }
// });

// •  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', 
// { data: { "user": { "email": "l_w_d@i.ua", "password": "l_w_d" } } });
// : Sends a POST request to the login endpoint with the user's email and password.

// 5. 
// Parsing the response body:

// const responseBody = await response.json();

// This line parses the JSON response from the server.

// 6. 
// Extracting the access token:

// const accesToken = responseBody.user.token;

// This line extracts the access token from the response body.

// 7. 
// Logging the response body:

// console.log(responseBody);

// This line logs the entire response body to the console for debugging purposes.

// 8. 
// Updating the local storage with the access token:

// user.origins[0].localStorage[0].value = accesToken;

// This line updates the local storage value in the user object with the access token.

// 9. 
// Writing the updated user data to the authentication file:

// fs.writeFileSync(authFile, JSON.stringify(user));

// This line writes the updated user object back to the authentication file, 
// saving the new authentication state.



// Sure, let's break down this line of code:

// process.env['ACCESS_TOKEN'] = accesToken;

// 1. 
// process.env:
// •  process is a global object in Node.js that provides information about, 
// and control over, the current Node.js process.

// •  env is a property of process that is an object containing the user environment.
//  It allows you to access and modify environment variables.

// 1. 
// ['ACCESS_TOKEN']:
// •  This is the key for the environment variable you are setting. In this case, 
// you are creating or updating an environment variable named ACCESS_TOKEN.
// 2. 
// = accesToken;:
// •  This assigns the value of the accesToken variable (which you extracted from 
// the response body in the previous code) to the ACCESS_TOKEN environment variable.

// In summary, this line of code sets an environment variable named ACCESS_TOKEN 
// to the value of the accesToken variable. This can be useful for securely storing 
// and accessing the token in other parts of your application without hardcoding it 
// directly into your code. 