import { SET_LOADING } from './types';

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
}); 