import { Page, Locator, expect } from '@playwright/test';


/**
* Page Object Model for the Lucanet homepage
*/
export class HomePage {
 readonly page: Page;
  // Main selectors
 readonly heroHeading: Locator;
 readonly navigationMenu: Locator;
 readonly footerLinks: Locator;
 readonly solutionsLink: Locator;
 readonly imprintLink: Locator;
 readonly complianceLink: Locator;
 readonly solutionsSection: Locator;


 /**
  * Initialize the HomePage with a Playwright Page object
  */
 constructor(page: Page) {
   this.page = page;
  
   // Initialize selectors
   this.heroHeading = page.locator('div.hero-advanced__headline.hero-advanced__headline--default')
   this.navigationMenu = page.locator('nav');
   this.footerLinks = page.locator('footer a');
   this.solutionsLink = page.locator(`
     button.main-navigation__item.main-navigation__item--mobile:has-text("Solutions")
     a.main-navigation__item.main-navigation__item--desktop:has-text("Solutions"),
   `).first();
   this.imprintLink = page.locator('footer >> text=Imprint');
   this.complianceLink = page.locator('footer >> text=Compliance');
   this.solutionsSection = page.locator(`
     section.solutions-section,
     div.solutions-section,
     section[data-section="solutions"],
     #solutions-section,
     main.solutions-page
   `);
  
   // Wait for page to be fully loaded with a timeout
   page.waitForLoadState('networkidle', { timeout: 30000 }).catch(e =>
     console.warn('Page did not reach network idle state:', e)
   );
 }


 /**
 /**
  * Navigate to the Lucanet homepage
  */
 async navigateToHomepage() {
   await this.page.goto('https://www.lucanet.com/en/', { timeout: 60000 });
   await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
   await this.acceptCookiesIfPresent();
 }
  /**
  * Accept cookies if the dialog is present
  */
 async acceptCookiesIfPresent() {
   const cookieDialog = this.page.locator('#CybotCookiebotDialog');
   if (await cookieDialog.isVisible()) {
     await this.page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
     await cookieDialog.waitFor({ state: 'hidden' });
   }
 }
 /**
 /**
  * Click on the Solutions link in the navigation
  */
 async clickSolutions() {
   await this.acceptCookiesIfPresent();
   const viewport = this.page.viewportSize();
   const isMobile = viewport ? viewport.width < 1024 : false;
   const selector = isMobile
     ? 'button.main-navigation__item.main-navigation__item--mobile:has-text("Solutions")'
     : 'a.main-navigation__item.main-navigation__item--desktop:has-text("Solutions")';
  
   try {
     await this.page.locator(selector).click();
    
     // Wait for either exact URL or pattern
     const expectedUrls = [
       'https://www.lucanet.com/en/solutions/',
       '**/solutions/',
       '**/solutions'
     ];
    
     // Try each URL pattern
     for (const url of expectedUrls) {
       try {
         await this.page.waitForURL(url, { timeout: 5000 });
         return true;
       } catch (e) {
         continue;
       }
     }
    
     // Final fallback: check if current URL contains 'solutions'
     return this.page.url().toLowerCase().includes('solutions');
   } catch (e) {
     console.log('Navigation to solutions page failed:', e);
     return false;
   }
 }
 /**
  * Check if the hero heading is visible
  */
 async isHeroHeadingVisible(): Promise<boolean> {
   try {
     await expect(this.heroHeading).toBeVisible({ timeout: 10000 });
     return true;
   } catch (e) {
     return false;
   }
 }
  /**
  * Get the text of the hero heading
  * @returns The text content of the hero heading
  */
 async getHeroHeadingText(): Promise<string> {
   return await this.heroHeading.textContent() || '';
 }


 /**
  * Check if the navigation menu is visible
  * @returns Promise<boolean> True if the navigation menu is visible, false otherwise
  */
 async isNavigationMenuVisible(): Promise<boolean> {
   try {
     await expect(this.navigationMenu).toBeVisible({ timeout: 5000 });
     return true;
   } catch (e) {
     return false;
   }
 }
  /**
 /**
  * Check if the solutions section is visible
  */
 async isSolutionsSectionVisible(): Promise<boolean> {
   try {
     await expect(this.solutionsSection).toBeVisible({ timeout: 30000 });
     return true;
   } catch (e) {
     console.log('Solutions section not found:', e);
     return false;
   }
 }
 /**
  * Check if the footer links are visible
  */
 async areFooterLinksVisible() {
   await expect(this.footerLinks).toBeVisible();
 }


 /**
  * Check if the Imprint link is visible in the footer
  */
 async isImprintLinkVisible() {
   await expect(this.imprintLink).toBeVisible();
 }


 /**
  * Check if the Compliance link is visible in the footer
  */
 async isComplianceLinkVisible() {
   await expect(this.complianceLink).toBeVisible();
 }
  /**
  * Check if a specific footer link is visible
  * @param linkText The text of the link to check
  * @returns Promise<boolean> True if the link is visible, false otherwise
  */
 async isFooterLinkVisible(linkText: string): Promise<boolean> {
   const link = this.page.locator(`footer >> text="${linkText}"`);
   try {
     await expect(link).toBeVisible({ timeout: 5000 });
     return true;
   } catch (e) {
     return false;
   }
 }


 /**
  * Check if the current page has the expected title
  * @param title The expected title
  */
 async hasTitle(title: string) {
   await expect(this.page).toHaveTitle(title);
 }


 /**
  * Wait for navigation to complete after clicking a link
  */
 async waitForNavigation() {
   await this.page.waitForLoadState('networkidle');
 }
}