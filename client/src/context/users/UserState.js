import axios from "axios";
import { useReducer, useContext, useEffect } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOAD_USERS,
  UPDATE_USER,
  UPDATE_ERROR,
} from "../types";

// Create a custom hook to use the auth context

export const useAuth = () => {
  const { state, dispatch } = useContext(UserContext);
  return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux
// but they remain here for ease of students transitioning

// Load User
export const loadUser = async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("http://localhost:8123/api/auth", config);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
// Get Users
export const getUsers = async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(`http://localhost:8123/api/users`, config);

    dispatch({
      type: LOAD_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post("http://localhost:8123/api/users", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Update User
export const updateUser = async (dispatch, user) => {
  const config = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(
      `http://localhost:8123/api/users/${user._id}`,
      user,
      config
    );

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ERROR,
      payload: error,
    });
  }
};

// Login User
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post("http://localhost:8123/api/auth", formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Logout
export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

// AuthState Provider Component

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    users: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // set token on initial app loading
  setAuthToken(state.token);

  // load user on first run or refresh
  if (state.loading) {
    loadUser(dispatch);
  }

  // 'watch' state.token and set headers and local storage on any change
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <UserContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default AuthState;
