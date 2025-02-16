import { UIState, UIActionTypes, SET_LOADING } from './types';

const initialState: UIState = {
  loading: false,
};

export function uiReducer(
  state = initialState,
  action: UIActionTypes
): UIState {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
} 