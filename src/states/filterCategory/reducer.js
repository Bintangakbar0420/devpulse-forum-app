import { ActionType } from './action';

const filterCategoryReducer = (filterCategory = null, action = {}) => {
  switch (action.type) {
  case ActionType.SET_FILTER_CATEGORY:
    return action.payload.category;
  case ActionType.CLEAR_FILTER_CATEGORY:
    return null;
  default:
    return filterCategory;
  }
};

export default filterCategoryReducer;
