# Lucanet Homepage Test Automation Framework

## Overview

This project is a **test automation framework** for the Lucanet website, built using **Playwright** and **TypeScript**. It is designed to be **maintainable**, **scalable**, and **reliable**, making it easy to write, organize, and execute UI tests. The framework follows best practices to ensure tests are robust and adaptable to changes in the application.

```plaintext
project_assignment_lucanet/
├── tests/                     # Test Layer: Contains test cases and scenarios
│   ├── navigation.test.ts     # Example test file
│   └── ...
├── pages/                     # Page Object Layer: Encapsulates page-specific selectors and actions
│   ├── homePage.ts            # Example Page Object for the homepage
│   └── ...
├── config/                    # Configuration Layer: Manages environment-specific settings
│   ├── playwright.config.ts   # Playwright configuration file
│   ├── devices.ts             # Device/viewport settings
│   └── ...
├── package.json               # Project dependencies and scripts
└── README.md                  # Documentation
```

---

## Key Features

- **Maintainability**: Clear separation of test logic, reusable components, and modular architecture.
- **Scalability**: Easily add new tests or extend functionality without major changes to the structure.
- **Reliability**: Intelligent handling of dynamic content, robust error recovery, and consistent state management.
- **Cross-Browser Support**: Tests run on **Chromium**, **Firefox**, and **WebKit** browsers by default.

---

## Framework Structure

The framework is organized into distinct layers to ensure clarity and reusability:

1. **Test Layer**  
   - Contains test cases and scenarios.  
   - Focuses on business logic and user workflows.  
   - Uses Page Objects for interacting with the UI.

2. **Page Object Layer (POM)**  
   - Encapsulates page-specific elements and actions.  
   - Provides reusable methods for navigation and interaction.  
   - Handles element visibility, state management, and retries for flaky elements.

3. **Configuration Layer**  
   - Manages environment-specific settings (e.g., timeouts, viewport sizes).  
   - Centralized configuration in `playwright.config.ts` and `.env` files.  
   - Supports device-specific and browser-specific settings.

4. **Utility Layer**  
   - Shared helper functions for common tasks.  
   - Includes assertion patterns and error-handling utilities.

---

## Page Object Model (POM)

The **Page Object Model** is a key part of the framework, ensuring tests are easy to write and maintain. Each page of the application has a corresponding Page Object file that:

- **Manages Selectors**: Centralized definitions for all page elements.  
- **Provides Actions**: High-level methods like `clickLoginButton()` or `navigateToDashboard()`.  
- **Handles Errors**: Automatically retries actions for flaky elements and reports detailed errors.

This approach keeps test cases clean and focused on business logic, while the Page Objects handle the technical details of interacting with the UI.

---

## Setup and Installation

### Prerequisites

Before you begin, ensure the following are installed on your system:

- **Node.js** (v16 or higher)  
- **npm** (v7 or higher)  
- **Chrome**, **Firefox**, or **WebKit** browsers (latest versions)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/JulianskyCode/Playwright_Lucanet.git
   cd Playwright_Lucanet

2. Install dependencies:
   npm install

3. Install Playwright browsers:
   npx playwright install

4. Run tests:
   npx playwright test

## Configured Browsers and Workers

### Browsers
   The framework is configured to run tests on the following browsers by default:

   Chromium: For testing on Google Chrome and Microsoft Edge.
   Firefox: For testing on Mozilla Firefox.
   WebKit: For testing on Safari.
   These configurations are defined in the playwright.config.ts file. You can customize the browser settings as needed.

### Workers
   The framework is set up to run tests in parallel using multiple workers to optimize execution time. By default:

   The number of workers is automatically determined based on the available CPU cores.
   You can override the number of workers using the --workers flag:

   npx playwright test --workers=4
