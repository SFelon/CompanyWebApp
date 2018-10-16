import { notification } from 'antd';
import {
  ACCESS_TOKEN,
  IS_LOADING,
  API_BASE_URL,
  SET_CURRENT_USER,
  LOGOUT_USER,
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

function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    currentUser,
    isAuthenticated: true,
    isLoading: false,
  };
}

function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

function loadingUser(toggle) {
  return {
    type: IS_LOADING,
    isLoading: toggle,
  };
}

export function getCurrentUser() {
  return (dispatch) => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      dispatch(loadingUser(false));
      return Promise.reject('No access token set.');
    }

    return request({
      url: `${API_BASE_URL}/users`,
      method: 'GET',
    }).then((response) => {
      dispatch(setCurrentUser(response));
    }).catch((error) => {
      notification.error({
        message: 'Company App',
        description: error.message || 'Sorry! Something went wrong. Please try again!',
      });
    });
  };
}

export function signInAction(loginRequest) {
  return (dispatch) => {
    dispatch(loadingUser(true));
    return request({
      url: `${API_BASE_URL}/auth/signin`,
      method: 'POST',
      body: JSON.stringify(loginRequest),
    }).then((response) => {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
    }).then(setTimeout(() => {
      dispatch(getCurrentUser());
    }, 1500))
      .catch((error) => {
        if (error.status === 401) {
          notification.error({
            message: 'Company App',
            description: 'Your Username or Password is incorrect. Please try again!',
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

export function logoutAction() {
  return (dispatch) => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(logoutUser());
    setTimeout(notification.success({
      message: 'Company App',
      description: 'You are successfully logged out.',
    }), 500);
  };
}


export function checkUsernameAvailability(username) {
  return request({
    url: `${API_BASE_URL}/auth/checkUsernameAvailability?username=${username}`,
    method: 'GET',
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: `${API_BASE_URL}/auth/checkEmailAvailability?email=${email}`,
    method: 'GET',
  });
}