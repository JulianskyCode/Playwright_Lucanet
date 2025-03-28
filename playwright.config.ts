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
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Configure retries for flaky tests - Retry both on CI and locally */
  retries: process.env.CI ? 3 : 2, // Increased local retries for better stability
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : '50%', // Use 50% of CPU cores locally
  /* Configure timeouts */
  timeout: 30000, // Global timeout for tests (30 seconds standard)
  expect: {
    timeout: 30000, // Standard 30 seconds timeout for expect() assertions
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { 
      open: 'on-failure', // Automatically open report on test failure
      outputFolder: './playwright-report',
      attachmentsBaseURL: './', // Base URL for attachments in the report
    }],
    ['json', { 
      outputFile: 'test-results/test-results.json' 
    }],
    ['list'], // Console reporter for real-time test progress
    ['dot'] // Minimal dot reporter for CI environments
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.lucanet.com/en/',
    
    /* Maximum time each action (like click(), fill()) can take */
    actionTimeout: 30000, // Standard 30 seconds timeout for all actions
    
    /* Maximum navigation time */
    navigationTimeout: 30000, // Increased for more reliable page loads
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Capture screenshot on test failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure - capturing on all failures for better debugging */
    video: 'on-failure',
    
    /* Automatically clean cookies, localStorage, etc., between tests */
    storageState: undefined,
    
    /* Enable JavaScript in the browser */
    javaScriptEnabled: true,
  },

  /* Configure projects for major browsers - Using Chromium as the primary browser */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          slowMo: process.env.CI ? 0 : 50,
          args: [
            '--disable-dev-shm-usage', 
            '--no-sandbox',
            '--disable-gpu',
            '--disable-extensions'
          ]
        },
        // Additional browser-specific settings
        ignoreHTTPSErrors: true, // Ignore HTTPS errors for testing
        acceptDownloads: true, // Accept downloads in headless mode
      },
    },

    /* Firefox configuration */
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          slowMo: process.env.CI ? 0 : 50,
        },
        // Additional browser-specific settings
        ignoreHTTPSErrors: true, // Ignore HTTPS errors for testing
        acceptDownloads: true, // Accept downloads in headless mode
      },
    },

    /* WebKit configuration */
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          slowMo: process.env.CI ? 0 : 50,
        },
        // Additional browser-specific settings
        ignoreHTTPSErrors: true, // Ignore HTTPS errors for testing
        acceptDownloads: true, // Accept downloads in headless mode
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { 
    //     ...devices['Pixel 5'],
    //     launchOptions: {
    //       slowMo: process.env.CI ? 0 : 100,
    //     },
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { 
    //     ...devices['iPhone 12'],
    //     launchOptions: {
    //       slowMo: process.env.CI ? 0 : 100,
    //     },
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { 
    //     ...devices['Desktop Edge'], 
    //     channel: 'msedge',
    //     viewport: { width: 1920, height: 1080 },
    //     launchOptions: {
    //       slowMo: process.env.CI ? 0 : 50,
    //     },
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { 
    //     ...devices['Desktop Chrome'], 
    //     channel: 'chrome',
    //     viewport: { width: 1920, height: 1080 },
    //     launchOptions: {
    //       slowMo: process.env.CI ? 0 : 50,
    //       args: ['--disable-dev-shm-usage', '--no-sandbox']
    //     },
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 60000,
  // },
  
  /* Define global setup and teardown scripts */
  // If you need global setup or teardown scripts, uncomment these lines and create the files
  // globalSetup: './global-setup.ts',
  // globalTeardown: './global-teardown.ts',
  
  /* Folder for test artifacts like screenshots and videos */
  outputDir: './test-results/artifacts/',
});
