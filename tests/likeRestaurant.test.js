import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    restaurant,
  });
};

describe('Liking A Restaurant', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
  });

  it('should not add a restaurant again when its already liked', async () => {
    await createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await createLikeButtonPresenterWithRestaurant({ });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(0);
  });
});