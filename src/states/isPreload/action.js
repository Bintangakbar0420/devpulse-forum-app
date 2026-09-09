import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'isPreload/set',
};

const setIsPreloadActionCreator = (isPreload) => ({
  type: ActionType.SET_IS_PRELOAD,
  payload: {
    isPreload,
  },
});

const asyncPreloadProcess = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = api.getAccessToken();
      if (token) {
        const authUser = await api.getOwnProfile();
        dispatch(setAuthUserActionCreator(authUser));
      } else {
        dispatch(setAuthUserActionCreator(null));
      }
    } catch {
      // If token expired or invalid, reset auth
      api.removeAccessToken();
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoading());
    }
  };
};

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
};
