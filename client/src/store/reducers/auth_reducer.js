import { SET_CURRENT_USER, IS_LOADING, LOGOUT_USER } from '../constants/index';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        isLoading: action.isLoading,
      };
    case SET_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        isAuthenticated: action.isAuthenticated,
        isLoading: action.isLoading,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};
