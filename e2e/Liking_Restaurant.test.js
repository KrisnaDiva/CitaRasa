/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});


Scenario('liking one restaurant', async ({ I }) => {
  // Verify no liked restaurants
  I.see("You don't have any favorite restaurants yet", '.restaurant-item__not__found');

  // Go to home page
  I.amOnPage('/');
  I.seeElement('.restaurant-item');

  // Click first restaurant
  const firstRestaurant = locate('.restaurant-name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(locate('.restaurant-item').first());

  // Click like button
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Go to favorite page
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  // Verify liked restaurant
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-name');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});