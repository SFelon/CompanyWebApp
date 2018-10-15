import { notification } from 'antd';
import {
  ACCESS_TOKEN,
  API_BASE_URL,
  SET_EMPLOYEE_LIST,
  IS_LOADING_EMPLOYEES,
} from '../constants/index';

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`);
  }

  const defaults = { headers };
  const customOptions = Object.assign({}, defaults, options);

  return fetch(customOptions.url, customOptions)
    .then(response => response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    }));
};

function _employeesList(employees) {
  return {
    type: SET_EMPLOYEE_LIST,
    employees,
    isLoadingEmployees: false,
  };
}

function loadingIndicator(toggle) {
  return {
    type: IS_LOADING_EMPLOYEES,
    isLoadingEmployees: toggle,
  };
}


export function getEmployeeListByDepartment(id) {
  return (dispatch) => {
    dispatch(loadingIndicator(true));
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      dispatch(loadingIndicator(false));
      return Promise.reject('No access token set.');
    }
    return request({
      url: `${API_BASE_URL}/departments/${id}/employees`,
      method: 'GET',
    }).then((response) => {
      dispatch(_employeesList(response));
    }).catch((error) => {
      notification.error({
        message: 'Company App',
        description: error.message || 'Sorry! Could not load the employees list!',
      });
      dispatch(_employeesList([]));
    });
  };
}

export function getAllEmployeeList() {
  return (dispatch) => {
    dispatch(loadingIndicator(true));
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      dispatch(loadingIndicator(false));
      return Promise.reject('No access token set.');
    }
    return request({
      url: `${API_BASE_URL}/departments/employees`,
      method: 'GET',
    }).then((response) => {
      dispatch(_employeesList(response));
    }).catch((error) => {
      notification.error({
        message: 'Company App',
        description: error.message || 'Sorry! Could not load the employees list!',
      });
      dispatch(_employeesList([]));
    });
  };
}
