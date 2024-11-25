import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel  */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {name:'setup',testMatch:'vNum0auth.setup.ts'},
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],storageState:'.auth/user.json' },
      dependencies:['setup']
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],storageState:'.auth/user.json' },
      dependencies:['setup']
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],storageState:'.auth/user.json' },
      dependencies:['setup']
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});




// 1. 
// Comment explaining the purpose:

// / Configure projects for major browsers /

// This comment indicates that the following configuration is for setting 
// up projects to run tests on major browsers.

// 2. 
// Defining the projects array:

// projects: [

// This line starts the definition of an array of project configurations.

// 3. 
// Setup project configuration:

// { name: 'setup', testMatch: 'vNum0auth.setup.ts' },

// •  name: 'setup': Names this project 'setup'.

// •  testMatch: 'vNum0auth.setup.ts': Specifies that this project 
// should run the test file vNum0auth.setup.ts.

// 4. 
// Chromium project configuration:

// {
// name: 'chromium',
// use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
// dependencies: ['setup']
// },

// •  name: 'chromium': Names this project 'chromium'.

// •  use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' }:
//  Uses the settings for 'Desktop Chrome' and specifies the storage state file 
//  to use for authentication.

// •  dependencies: ['setup']: 
// Indicates that this project depends on the 'setup' project,
//  meaning it will run after the 'setup' project has completed.

// 5. 
// Firefox project configuration:

// {
// name: 'firefox',
// use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' },
// dependencies: ['setup']
// },

// •  name: 'firefox': Names this project 'firefox'.

// •  use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' }: 
// Uses the settings for 'Desktop Firefox' and specifies the storage state file 
// to use for authentication.

// •  dependencies: ['setup']: 
// Indicates that this project depends on the 'setup' project.

// 6. 
// Webkit project configuration:

// {
// name: 'webkit',
// use: { ...devices['Desktop Safari'], storageState: '.auth/user.json' },
// dependencies: ['setup']
// },

// •  name: 'webkit': Names this project 'webkit'.

// •  use: { ...devices['Desktop Safari'], storageState: '.auth/user.json' }: 
// Uses the settings for 'Desktop Safari' and specifies the storage state file 
// to use for authentication.

// •  dependencies: ['setup']: Indicates that this project depends on the 'setup' project.

// This configuration ensures that tests are run on multiple browsers 
// (Chrome, Firefox, and Safari) using the same authenticated state,
//  which is set up in the 'setup' project.