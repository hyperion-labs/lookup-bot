/* Variables ==================================================================== */
// Libraries
import axios from 'axios';

// Custom
import { FETCH_USER } from '../../constants';

/* Redux Actions ==================================================================== */
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/auth/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
