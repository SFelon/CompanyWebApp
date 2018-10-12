import { notification } from 'antd';
import {
  ACCESS_TOKEN,
  API_BASE_URL,
  IS_LOADING_DEPARTMENT,
  SET_DEPARTMENT_LIST,
  ADD_NEW_DEPARTMENT,
  DELETE_DEPARTMENT,
  EDIT_DEPARTMENT,
  SET_DEPARTMENT_INFO,
  IS_LOADING_DEPARTMENT_INFO,
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

function _departmentList(departments) {
    return {
        type: SET_DEPARTMENT_LIST,
        departments,
        isLoadingDepartments: false,
    };
}

function _addDepartment(newDepartment) {
    return {
        type: ADD_NEW_DEPARTMENT,
        newDepartment,
        isLoadingDepartments: false,
    };
}

function _deleteDepartment({ id } = {}) {
  return {
    type: DELETE_DEPARTMENT,
    id,
    isLoadingDepartments: false,
  };
}

function _editDepartment(editedDepartment, id) {
  return {
    type: EDIT_DEPARTMENT,
    id,
    editedDepartment,
    isLoadingDepartments: false,
  };
}

function _departmentInfo(departmentInfo) {
  return {
    type: SET_DEPARTMENT_INFO,
    departmentInfo,
    isLoadingDepartments: false,
  };
}


function loadingIndicator(toggle) {
    return {
        type: IS_LOADING_DEPARTMENT,
        isLoadingDepartments: toggle,
    };
}

function loadingDepartmentInfo(toggle){
  return {
    type: IS_LOADING_DEPARTMENT_INFO,
    isLoadingDepartmentInfo: toggle,
  };
}

export function getDepartmentList() {
return (dispatch) => {
    dispatch(loadingIndicator(true));
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        dispatch(loadingIndicator(false));
        return Promise.reject('No access token set.');
    }
    return request({
    url: `${API_BASE_URL}/departments`,
    method: 'GET',
    }).then((response) => {
        dispatch(_departmentList(response));
    }).catch((error) => {
    notification.error({
        message: 'Company App',
        description: error.message || 'Sorry! Could not load the department list!',
    });
    });
};
}

export function addDepartment(addDepRequest) {
    return (dispatch) => {
      dispatch(loadingIndicator(true));
      return request({
        url: `${API_BASE_URL}/departments`,
        method: 'POST',
        body: JSON.stringify(addDepRequest),
      }).then((response) => {
          if (response.success === true) {
              dispatch(_addDepartment(addDepRequest));
          }
      }).catch((error) => {
          if (error.status === 401) {
            notification.error({
              message: 'Company App',
              description: 'You are not authorized to add new department!',
            });
          } else {
            notification.error({
              message: 'Company App',
              description: error.message || 'Sorry! Something went wrong. Please try again!',
            });
          }
        }).finally(() => {
        dispatch(loadingIndicator(false));
      });
    };
}


export function deleteDepartment( {id} = {} ) {
  return (dispatch) => {
    dispatch(loadingIndicator(true));
    return request({
      url: `${API_BASE_URL}/departments/${id}`,
      method: 'DELETE',
    }).then((response) => {
      if (response.success === true) {
        dispatch(_deleteDepartment( {id} ));
        setTimeout(notification.success({
          message: 'Company App',
          description: 'Department deleted successfully!',
        }), 500);
      }
    }).catch((error) => {
      if (error.status === 401) {
        notification.error({
          message: 'Company App',
          description: 'You are not authorized to delete department!',
        });
      } else {
        notification.error({
          message: 'Company App',
          description: error.message || 'Sorry! Something went wrong. Please try again!',
        });
      }
    }).finally(()=>{
      dispatch(loadingIndicator(false));
    });
  };
}

export function editDepartment(editedDepartment, id) {
  return (dispatch) => {
    dispatch(loadingIndicator(true));
    return request({
    url: `${API_BASE_URL}/departments/${id}`,
    method: 'PUT',
    body: JSON.stringify(editedDepartment),
    }).then((response) => {
        if (response.success === true) {
            dispatch(_editDepartment(editedDepartment, id));
        }
    }).catch((error) => {
        if (error.status === 401) {
        notification.error({
            message: 'Company App',
            description: 'You are not authorized to edit department!',
        });
        } else {
        notification.error({
            message: 'Company App',
            description: error.message || 'Sorry! Something went wrong. Please try again!',
        });
        }
    });
  };
}

export function getDepartmentInfo(id) {
  return (dispatch) => {
    dispatch(loadingDepartmentInfo(true));
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      dispatch(loadingIndicator(false));
      return Promise.reject('No access token set.');
    }
    return request({
      url: `${API_BASE_URL}/departments/${id}`,
      method: 'GET',
    }).then((response) => {
      dispatch(_departmentInfo(response));
    }).catch((error) => {
      notification.error({
        message: 'Company App',
        description: error.message || 'Sorry! Could not load the department info!',
      });
    });
  };
}
