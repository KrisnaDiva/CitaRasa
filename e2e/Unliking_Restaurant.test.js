const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.seeElement('.restaurant-item');
  const firstRestaurant = locate('.restaurant-name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(locate('.restaurant-item').first());
  
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-name');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
  
  I.click('.restaurant-item');
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  I.amOnPage('/#/favorite');
  I.see("You don't have any favorite restaurants yet", '.restaurant-item__not__found');
});