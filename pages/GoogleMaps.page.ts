import { Locator, Page, expect } from '@playwright/test';

export class GoogleMapsPage {
  readonly page: Page;
  readonly destinationInput: Locator;
  readonly destinationTitle: Locator
  readonly searchButton: Locator
  readonly directionsButton: Locator
  readonly destinationField: Locator


  constructor(page: Page) {
    this.page = page;
    this.destinationInput = page.locator('#searchboxinput');
    this.destinationTitle = page.locator('h1');
    this.searchButton = page.getByLabel('Search', { exact: true })
    this.directionsButton = page.locator('//button[contains(@data-value, "Directions")]');
    this.destinationField = page.locator('input.tactile-searchbox-input[aria-label*="Destination"]');
  }

  async navigate(){
    this.page.goto("https://www.google.com/maps?hl=en")
    this.page.click('button:has-text("Accept All")');
  }

  
  async enterDestination(destination: string) {
    await this.destinationInput.click(); 
    await this.destinationInput.fill(destination);
    await this.searchButton.click();
  }
  
}