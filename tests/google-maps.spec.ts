import { test, expect, Page } from '@playwright/test';
import { GoogleMapsPage } from '../pages/GoogleMaps.page';
const destinations = ['Paris', '!@#$Paris', 'Париж', 'Paryż']; 


//Acceptance Criteria 1 and unhappy paths
for (const destination of destinations) {
  test(`Testing destination: ${destination}`, async ({ page }) => {
    const googleMapsPage = new GoogleMapsPage(page)
    await test.step('Open Google Maps', async () => {
      await googleMapsPage.navigate()
    })
    await test.step(`Enter "${destination}" in the search box`, async () => {
      await googleMapsPage.enterDestination(destination)
    })
    await test.step(`Verify that left panel have "${destination}" as the headline text`, async () => {
      await expect(googleMapsPage.destinationTitle).toContainText(destination);
    })
  });
}

//Acceptance Criteria 2
test(`Testing destination: London`, async ({ page }) => {
  const googleMapsPage = new GoogleMapsPage(page)
  await test.step('Open Google Maps', async () => {
    await googleMapsPage.navigate()
  })
  await test.step(`Enter London in the search box`, async () => {
    await googleMapsPage.enterDestination("London")
  })
  await test.step(`Verify that left panel have London as the headline text`, async () => {
    await expect(googleMapsPage.destinationTitle).toContainText("London");
  })
  await test.step(`Click on "Directions"`, async () => {
    await googleMapsPage.directionsButton.click()
  })
  await test.step(`Verify that left panel have London as the headline text in the search box`, async () => {
    await expect(googleMapsPage.destinationField).toHaveValue(new RegExp("London"));

  })
});


