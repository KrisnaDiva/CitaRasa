import RestaurantList from '../views/pages/restaurant-list';
import Detail from '../views/pages/detail';

const routes = {
  '/': RestaurantList,
  '/restaurant-list': RestaurantList,
  '/detail/:id': Detail,
};

export default routes;