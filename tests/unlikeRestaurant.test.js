import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Unliking A Restaurant', () => {
  const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
    restaurant,
    });
  };

  beforeEach(() => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    const restaurant = {
      id: 1,
      name: 'Test Restaurant',
    };
    
    await FavoriteRestaurantIdb.putRestaurant(restaurant);
    await createLikeButtonPresenterWithRestaurant(restaurant);

    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    const restaurant = {
      id: 1,
      name: 'Test Restaurant',
    };
    
    await FavoriteRestaurantIdb.putRestaurant(restaurant);
    await createLikeButtonPresenterWithRestaurant(restaurant);

    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    const restaurant = {
      id: 1,
      name: 'Test Restaurant',
    };
    
    await FavoriteRestaurantIdb.putRestaurant(restaurant);
    await createLikeButtonPresenterWithRestaurant(restaurant);

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(0);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    const restaurant = {
      id: 1,
      name: 'Test Restaurant',
    };

    await createLikeButtonPresenterWithRestaurant(restaurant);
    
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
    
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    
    expect(await FavoriteRestaurantIdb.getRestaurant(1)).toBeTruthy();
    
    await FavoriteRestaurantIdb.deleteRestaurant(1);
    
    expect(await FavoriteRestaurantIdb.getRestaurant(1)).toBeFalsy();
    
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(0);
  });
});