interface Viewport {
    width: number;
    height: number;
}

interface TimeoutConfig {
    navigation: number;
    networkIdle: number;
    visibility: number;
    animation: number;
}

const DEFAULT_TIMEOUTS: TimeoutConfig = {
    navigation: 30000,
    networkIdle: 5000,
    visibility: 10000,
    animation: 1000
};

const VIEWPORT_BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
    desktop: 1440
};

export class HomePage {
    /**
     * Checks if an element is visible on the page
     * @param locator - The element locator to check
     * @param timeout - Optional timeout in milliseconds (defaults to DEFAULT_TIMEOUTS.visibility)
     * @returns Promise<boolean> - True if the element is visible, false otherwise
     * @private
     */
    private async checkVisibility(locator: Locator, timeout: number = DEFAULT_TIMEOUTS.visibility): Promise<boolean> {
        try {
            await expect(locator).toBeVisible({ timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Checks if the hero heading is visible
     * @returns Promise<boolean>
     */
    async isHeroHeadingVisible(): Promise<boolean> {
        return this.checkVisibility(this.heroHeading);
    }

    /**
     * Checks if the navigation menu is visible
     * @returns Promise<boolean>
     */
    async isNavigationMenuVisible(): Promise<boolean> {
        return this.checkVisibility(this.navigationMenu);
    }

    /**
     * Checks if the solutions section is visible
     * @returns Promise<boolean>
     */
    async isSolutionsSectionVisible(): Promise<boolean> {
        return this.checkVisibility(this.solutionsSection);
    }

    /**
     * Checks if all footer links are visible
     * @returns Promise<boolean>
     */
    async areFooterLinksVisible(): Promise<boolean> {
        return this.checkVisibility(this.footerLinks);
    }

    /**
     * Navigates to the home page
     * @returns Promise<void>
     */
    async navigateToHome(): Promise<void> {
        await this.page.goto('/', {
            waitUntil: 'networkidle',
            timeout: DEFAULT_TIMEOUTS.navigation
        });
        await this.page.waitForLoadState('networkidle', {
            timeout: DEFAULT_TIMEOUTS.networkIdle
        });
    }

    /**
     * Waits for the page to load completely
     * @returns Promise<void>
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('load', {
            timeout: DEFAULT_TIMEOUTS.navigation
        });
        await this.page.waitForLoadState('networkidle', {
            timeout: DEFAULT_TIMEOUTS.networkIdle
        });
    }

    /**
     * Waits for animations to complete
     * @returns Promise<void>
     */
    async waitForAnimation(): Promise<void> {
        await this.page.waitForTimeout(DEFAULT_TIMEOUTS.animation);
    }

    /**
     * Checks if the current viewport is mobile-sized
     * @returns Promise<boolean> - True if the viewport width is less than or equal to the mobile breakpoint
     */
    async isMobileViewport(): Promise<boolean> {
        const viewport = await this.page.viewportSize();
        return viewport && viewport.width <= VIEWPORT_BREAKPOINTS.mobile;
    }

    /**
     * Checks if a specific footer link is visible
     * @param linkSelector - The selector for the footer link to check
     * @returns Promise<boolean> - True if the specified footer link is visible
     */
    async isFooterLinkVisible(linkSelector: string): Promise<boolean> {
        const footerLink = this.page.locator(linkSelector);
        return this.checkVisibility(footerLink);
    }
}
