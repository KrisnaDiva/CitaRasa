/* eslint-disable no-undef */
const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('unliking one restaurant', async ({ I }) => {
  // Like a restaurant first
  I.seeElement('.restaurant-item');
  const firstRestaurant = locate('.restaurant-name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(locate('.restaurant-item').first());
  
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  // Go to favorite page & verify
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-name');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
  
  // Unlike the restaurant
  I.click('.restaurant-item');
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  // Verify it's removed from favorites
  I.amOnPage('/#/favorite');
  I.see("You don't have any favorite restaurants yet", '.restaurant-item__not__found');
});