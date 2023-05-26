import {
  CLEAR_ERRORS,
  ERROR_AUTH,
  LOADING_AUTH,
  LOGIN_AUTH,
  SIGNUP_AUTH,
} from "../ActionTypes/Auth.actiontypes";

const token = JSON.parse(localStorage.getItem("jwtoken"));

const initialState = {
  isAuth: false,
  token: token || "",
  isLoading: false,
  message: "",
  isError: false,
  isSuccess: false,
};
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_AUTH: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SIGNUP_AUTH:
    case LOGIN_AUTH: {
      const userObj = {
        first_name:payload.user.first_name,
        last_name:payload.user.last_name,
        email:payload.user.email,
        role:payload.user.role,
      }
      localStorage.setItem("jwtoken", JSON.stringify(payload.token));
      localStorage.setItem("userObj", JSON.stringify(userObj));
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isAuth: true,
        message: payload.message,
        token: payload.token,
      };
    }
    case ERROR_AUTH: {
      return {
        ...state,
        isLoading: false,
        message: payload,
        isError: true,
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        isAuth:false,
        isError: false,
        isSuccess: false,
        message: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
