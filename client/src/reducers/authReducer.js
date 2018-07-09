import { FETCH_USER } from '../actions/types';

const INITIAL_STATE = {
  isLoading: true,
  user: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        isLoading: false,
        user: action.payload || false,
      };

    default:
      return state;
  }
};
