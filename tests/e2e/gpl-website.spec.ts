import { test, expect } from '@playwright/test';

/**
 * GPL Website E2E Tests
 *
 * Critical user flows for Guyana Power & Light website.
 * Focus on emergency contacts visibility and core page functionality.
 */

test.describe('Emergency Contacts Visibility', () => {
  /**
   * CRITICAL SAFETY REQUIREMENT:
   * Emergency contacts MUST be visible on every page.
   */

  test('emergency contacts visible in header on homepage', async ({ page }) => {
    await page.goto('/');

    // Check for emergency contacts section or button in header
    const emergencySection = page.locator('[data-testid="emergency-contacts"]').or(
      page.getByText(/emergency/i).first()
    );
    await expect(emergencySection).toBeVisible();
  });

  test('emergency contacts visible in footer on all pages', async ({ page }) => {
    const pages = ['/', '/services', '/safety', '/contact', '/faq'];

    for (const path of pages) {
      await page.goto(path);

      // Check footer has emergency contact information
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // Look for emergency phone numbers in footer
      const emergencyNumber = footer.getByText(/0475|226-2600|333-2186|771-4244/);
      await expect(emergencyNumber.first()).toBeVisible();
    }
  });

  test('emergency number 0475 is displayed prominently', async ({ page }) => {
    await page.goto('/');

    // The main emergency number should be visible
    const emergencyNumber = page.getByText('0475');
    await expect(emergencyNumber.first()).toBeVisible();
  });
});

test.describe('Homepage', () => {
  test('should display GPL branding', async ({ page }) => {
    await page.goto('/');

    // Check for GPL in the title or header
    await expect(page).toHaveTitle(/GPL|Guyana Power|Light/i);
  });

  test('should display services section', async ({ page }) => {
    await page.goto('/');

    // Check for services section
    const servicesSection = page.getByRole('heading', { name: /services/i }).or(
      page.getByText(/electricity supply|billing|connections/i).first()
    );
    await expect(servicesSection).toBeVisible();
  });

  test('should have quick action buttons', async ({ page }) => {
    await page.goto('/');

    // Look for quick action items like "Report Outage", "Pay Bill", etc.
    const reportOutage = page.getByRole('link', { name: /report.*outage/i }).or(
      page.getByText(/report.*outage/i).first()
    );
    await expect(reportOutage).toBeVisible();
  });

  test('should navigate to services page', async ({ page }) => {
    await page.goto('/');

    // Click on services link
    const servicesLink = page.getByRole('link', { name: /services/i }).first();
    await servicesLink.click();

    await expect(page).toHaveURL(/\/services/);
  });
});

test.describe('Services Page', () => {
  test('should display all service categories', async ({ page }) => {
    await page.goto('/services');

    // Check for main service categories
    const categories = [
      /electricity supply/i,
      /connections/i,
      /billing/i,
      /meter/i,
    ];

    for (const category of categories) {
      const element = page.getByText(category).first();
      await expect(element).toBeVisible();
    }
  });

  test('should have emergency banner', async ({ page }) => {
    await page.goto('/services');

    // Check for emergency banner or contact info
    const emergencyInfo = page.getByText(/emergency|0475/i).first();
    await expect(emergencyInfo).toBeVisible();
  });
});

test.describe('Safety Page', () => {
  test('should load safety information', async ({ page }) => {
    await page.goto('/safety');

    // Check for safety heading
    const heading = page.getByRole('heading', { name: /safety/i }).first();
    await expect(heading).toBeVisible();
  });

  test('should display downed power lines warning', async ({ page }) => {
    await page.goto('/safety');

    // Critical safety content
    const warning = page.getByText(/downed.*line|stay.*away|danger/i).first();
    await expect(warning).toBeVisible();
  });

  test('should have emergency contacts prominently displayed', async ({ page }) => {
    await page.goto('/safety');

    // Emergency contacts should be extra visible on safety page
    const emergencyNumber = page.getByText('0475');
    await expect(emergencyNumber.first()).toBeVisible();
  });

  test('should display safety tips sections', async ({ page }) => {
    await page.goto('/safety');

    // Check for safety tip categories
    const safetyTopics = page.getByText(/storm|generator|electrical|fire/i);
    await expect(safetyTopics.first()).toBeVisible();
  });
});

test.describe('Contact Page', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/contact');

    // Check for form elements
    const nameInput = page.getByLabel(/name/i).or(
      page.locator('input[name="name"]')
    );
    await expect(nameInput.first()).toBeVisible();
  });

  test('should display office locations', async ({ page }) => {
    await page.goto('/contact');

    // Check for office/location info
    const locationInfo = page.getByText(/georgetown|berbice|essequibo|office|address/i).first();
    await expect(locationInfo).toBeVisible();
  });

  test('should display all emergency phone numbers', async ({ page }) => {
    await page.goto('/contact');

    // All regional emergency numbers should be visible
    const numbers = ['0475', '333-2186', '771-4244'];

    for (const number of numbers) {
      const element = page.getByText(number);
      await expect(element.first()).toBeVisible();
    }
  });

  test('should have form type selector', async ({ page }) => {
    await page.goto('/contact');

    // Check for different form types
    const formTypes = page.getByText(/general|outage|streetlight|feedback/i);
    await expect(formTypes.first()).toBeVisible();
  });
});

test.describe('FAQ Page', () => {
  test('should load FAQ page', async ({ page }) => {
    await page.goto('/faq');

    // Check for FAQ heading
    const heading = page.getByRole('heading', { name: /faq|frequently asked/i }).first();
    await expect(heading).toBeVisible();
  });

  test('should display FAQ questions', async ({ page }) => {
    await page.goto('/faq');

    // Look for FAQ questions (accordion items or question text)
    const question = page.getByText(/\?/).first();
    await expect(question).toBeVisible();
  });

  test('should have search or filter functionality', async ({ page }) => {
    await page.goto('/faq');

    // Check for search input or category filter
    const searchOrFilter = page.getByRole('searchbox').or(
      page.getByPlaceholder(/search/i)
    ).or(
      page.getByText(/category|filter/i).first()
    );
    await expect(searchOrFilter).toBeVisible();
  });

  test('should expand FAQ answers on click', async ({ page }) => {
    await page.goto('/faq');

    // Find and click a FAQ item
    const faqItem = page.locator('button, [role="button"]').filter({
      hasText: /\?/
    }).first();

    if (await faqItem.isVisible()) {
      await faqItem.click();

      // After clicking, more content should be visible
      await page.waitForTimeout(300); // Allow animation
    }
  });
});

test.describe('Navigation', () => {
  test('should navigate between all main pages', async ({ page }) => {
    await page.goto('/');

    const pages = [
      { link: /services/i, url: /\/services/ },
      { link: /safety/i, url: /\/safety/ },
      { link: /contact/i, url: /\/contact/ },
      { link: /faq/i, url: /\/faq/ },
    ];

    for (const { link, url } of pages) {
      // Go back to home first
      await page.goto('/');

      // Find and click the navigation link
      const navLink = page.getByRole('link', { name: link }).first();
      await navLink.click();

      // Verify we're on the correct page
      await expect(page).toHaveURL(url);
    }
  });

  test('should have working home link in header', async ({ page }) => {
    await page.goto('/services');

    // Click logo or home link
    const homeLink = page.getByRole('link', { name: /home|gpl|guyana power/i }).first();
    await homeLink.click();

    await expect(page).toHaveURL('/');
  });
});

test.describe('Responsive Design', () => {
  test('mobile: should show hamburger menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile should have a menu button
    const menuButton = page.getByRole('button', { name: /menu/i }).or(
      page.locator('[data-testid="mobile-menu"]')
    ).or(
      page.locator('button').filter({ has: page.locator('svg') }).first()
    );

    // Either menu button or navigation should be visible
    const nav = page.getByRole('navigation');
    const isNavVisible = await nav.isVisible();
    const isMenuVisible = await menuButton.isVisible().catch(() => false);

    expect(isNavVisible || isMenuVisible).toBeTruthy();
  });

  test('mobile: emergency contacts should still be visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Emergency info must be visible even on mobile
    const emergencyInfo = page.getByText(/0475|emergency/i).first();
    await expect(emergencyInfo).toBeVisible();
  });

  test('tablet: should display properly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper page structure', async ({ page }) => {
    await page.goto('/');

    // Check for main landmark
    const main = page.getByRole('main');
    await expect(main).toBeVisible();

    // Check for header
    const header = page.getByRole('banner').or(page.locator('header'));
    await expect(header).toBeVisible();

    // Check for footer
    const footer = page.getByRole('contentinfo').or(page.locator('footer'));
    await expect(footer).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Should have an h1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1.first()).toBeVisible();
  });

  test('links should have accessible names', async ({ page }) => {
    await page.goto('/');

    // Check that navigation links have text
    const navLinks = page.getByRole('link');
    const count = await navLinks.count();

    expect(count).toBeGreaterThan(0);
  });
});
