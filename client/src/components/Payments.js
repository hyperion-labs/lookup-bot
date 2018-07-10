/* Variables ==================================================================== */
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

/* Redux ==================================================================== */

/* App ==================================================================== */

const Payments = () => {
  return (
    <StripeCheckout
      name="Lookup Bot"
      description="Donate money to support the team!"
      amount={500}
      token={token => console.log(token)}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >
      <button type="button" className="btn">
        Donate
      </button>
    </StripeCheckout>
  );
};

/* Export ==================================================================== */
export default Payments;
