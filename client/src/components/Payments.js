/* Variables ==================================================================== */
// libraries
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

// custom
import * as Actions from '../redux/actions';

/* Redux ==================================================================== */
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  createPayment: Actions.createPayment,
};

/* App ==================================================================== */

const Payments = (props) => {
  const { user, createPayment } = props;

  return (
    <StripeCheckout
      name="Lookup Bot"
      description="Donate money to support the team!"
      amount={500}
      token={token => createPayment(user.uid, 500, token)}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >
      <button type="button" className="btn">
        Donate
      </button>
    </StripeCheckout>
  );
};

/* Export ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Payments);
