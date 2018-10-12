import {
  IS_LOADING_EMPLOYEES,
  SET_EMPLOYEE_LIST,
  LOGOUT_USER,
} from '../constants/index';

const initialState = {
  employees: [],
  isLoadingEmployees: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_EMPLOYEES:
      return {
        employees: state.employees,
        isLoadingEmployees: action.isLoadingEmployees,
      };
    case SET_EMPLOYEE_LIST:
      return {
        employees: action.employees,
        isLoadingEmployees: action.isLoadingEmployees,
      };
    /*case ADD_NEW_DEPARTMENT:
      return Object.assign(
        {},
        state,
        {
          departments: state.departments.concat(action.newDepartment),
          isLoadingDepartments: action.isLoadingDepartments,
        },
      );
    case DELETE_DEPARTMENT:
      return {
        departments: state.departments.filter(({ id }) => id !== action.id),
        isLoadingDepartments: action.isLoadingDepartments,
      };
    case EDIT_DEPARTMENT:
      return {
        departments: state.departments.map(department => {
          if (department.id === action.id) {
            return {
              ...department,
              ...action.editedDepartment,
            };
          } else {
            return department;
          }
        }),
        isLoadingDepartments: action.isLoadingDepartments,
      };*/
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};