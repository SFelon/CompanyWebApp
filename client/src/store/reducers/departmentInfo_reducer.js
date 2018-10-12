import {
  IS_LOADING_DEPARTMENT_INFO,
  LOGOUT_USER,
  SET_DEPARTMENT_INFO,
} from '../constants/index';

const initialState = {
  departmentInfo: [],
  isLoadingDepartmentInfo: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_DEPARTMENT_INFO:
      return {
        departmentInfo: state.departmentInfo,
        isLoadingDepartmentInfo: action.isLoadingDepartmentInfo,
      };
    case SET_DEPARTMENT_INFO:
      return {
        departmentInfo: action.departmentInfo,
        isLoadingDepartmentInfo: action.isLoadingDepartmentInfo,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};