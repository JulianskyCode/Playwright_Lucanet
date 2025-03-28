import { test, expect, Page, Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


// Describe the test suite for Lucanet Homepage
test.describe('Lucanet Homepage Tests', () => {
let page: Page;
let homePage: HomePage;
let browser: Browser;


// Before all tests, set up the browser context and navigate to the homepage
test.beforeAll(async ({ browser: browserInstance }) => {
  browser = browserInstance;
  const viewportWidth = parseInt(process.env.VIEWPORT_WIDTH || '1280', 10);
  const viewportHeight = parseInt(process.env.VIEWPORT_HEIGHT || '720', 10);
  const context = await browser.newContext({
    viewport: { width: viewportWidth, height: viewportHeight },
    storageState: undefined,
  });
   page = await context.newPage();
  homePage = new HomePage(page);
   await homePage.navigateToHomepage();
});


// After each test, close the browser context
test.afterEach(async () => {
  await page.close();
});


// Describe the test suite for verifying homepage content
test.describe('Homepage Content Verification', () => {
  // Test case to verify the hero heading text
  test('should display hero heading correctly', async () => {
    const heroHeadingVisible = await homePage.isHeroHeadingVisible();
    expect(heroHeadingVisible).toBeTruthy();
  
    const headingText = await homePage.getHeroHeadingText();
    expect(headingText).toContain('Empowering modern finance leaders to lead with ease');
  });


  // Test case to verify the navigation menu visibility
  test('should have navigation menu visible', async () => {
    const navigationMenuVisible = await homePage.isNavigationMenuVisible();
    expect(navigationMenuVisible).toBeTruthy();
  });


  // Test case to verify the footer links
  test('should have footer with required links', async () => {
    const imprintLinkVisible = await homePage.isFooterLinkVisible('Imprint');
    expect(imprintLinkVisible).toBeTruthy();
  
    const complianceLinkVisible = await homePage.isFooterLinkVisible('Compliance');
    expect(complianceLinkVisible).toBeTruthy();
  });
});


// Describe the test suite for navigation flow
test.describe('Navigation Flow', () => {
  // Test case to verify navigation to the Solutions section
  test('should navigate to Solutions section when clicking the Solutions link', async () => {
    const navigatedToSolutions = await homePage.clickSolutions();
    expect(navigatedToSolutions).toBeTruthy();
  });
});


});