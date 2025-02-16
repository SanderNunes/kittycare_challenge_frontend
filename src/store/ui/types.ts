export interface UIState {
  loading: boolean;
}

export const SET_LOADING = 'SET_LOADING';

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export type UIActionTypes = SetLoadingAction; 