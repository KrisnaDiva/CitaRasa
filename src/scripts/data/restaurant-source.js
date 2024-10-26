import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async list() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async detail(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson.restaurant;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async postReview(review) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      };

      const response = await fetch(API_ENDPOINT.REVIEW, options);
      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson;
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default RestaurantSource;