/* Variables ==================================================================== */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';

/* Redux ==================================================================== */

/* App ==================================================================== */

class PaymentsView extends Component {
  render() {
    return (
      <div>
        <h2>Payments Page</h2>
        <StripeCheckout
          amount={500}
          token={token => console.log(token)}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        />
      </div>
    );
  }
}

// PaymentsView.propTypes = {
// };

/* Export ==================================================================== */
export default PaymentsView;
