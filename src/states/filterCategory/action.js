const ActionType = {
  SET_FILTER_CATEGORY: 'filterCategory/set',
  CLEAR_FILTER_CATEGORY: 'filterCategory/clear',
};

const setFilterCategoryActionCreator = (category) => ({
  type: ActionType.SET_FILTER_CATEGORY,
  payload: {
    category,
  },
});

const clearFilterCategoryActionCreator = () => ({
  type: ActionType.CLEAR_FILTER_CATEGORY,
});

export {
  ActionType,
  setFilterCategoryActionCreator,
  clearFilterCategoryActionCreator,
};
