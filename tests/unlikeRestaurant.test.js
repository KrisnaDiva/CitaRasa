/* eslint-disable no-undef */
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

    // Inisialisasi presenter tanpa menyimpan restaurant ke database
    await createLikeButtonPresenterWithRestaurant(restaurant);
    
    // Cek apakah tombol like muncul (karena restaurant belum disukai)
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
    
    // Klik tombol like button
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    
    // Pastikan data ada di database
    expect(await FavoriteRestaurantIdb.getRestaurant(1)).toBeTruthy();
    
    // Hapus langsung dari database
    await FavoriteRestaurantIdb.deleteRestaurant(1);
    
    // Pastikan sudah terhapus
    expect(await FavoriteRestaurantIdb.getRestaurant(1)).toBeFalsy();
    
    // Klik unlike button tidak menyebabkan error
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    
    // Data tetap kosong
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(0);
  });
});