/* Variables ==================================================================== */
// Libraries
import axios from 'axios';

// Custom
import {
  ROUTES_AUTH_CURRENT_USER,
  ROUTES_PAYMENTS_CREATE,
  FETCH_USER,
} from '../../constants';

/* Redux Actions ==================================================================== */
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get(ROUTES_AUTH_CURRENT_USER);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createPayment = (uid, amount, token) => async (dispatch) => {
  console.log(ROUTES_PAYMENTS_CREATE);
  const res = await axios.post(ROUTES_PAYMENTS_CREATE, {
    paymentInfo: {
      uid,
      amount,
      token,
    },
  });
  console.log(res);
};
