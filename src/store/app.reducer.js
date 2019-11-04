import { ACTION_TYPES } from "./app.actions";



export const INITIAL_STATE = {
    repos: [],
    events: [],
    isLoading: true
  };

  export const rootReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
      case ACTION_TYPES.SET_IS_LOADING:
        return {
          ...state,
          isLoading: action.payload
        };
      case ACTION_TYPES.GET_REPOS:
        return {
          ...state,
          repos: action.payload
        };
        case ACTION_TYPES.GET_EVENTS:
        return {
          ...state,
          events: action.payload
        };
      default: {
        return state;
      }
    }
  };
  