/* Variables ==================================================================== */
// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Custom
import Payments from './Payments';
import {
  ROUTES_AUTH_GOOGLE,
  ROUTES_AUTH_LOGOUT,
} from '../constants';

/* Redux ==================================================================== */

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

/* App ==================================================================== */

class Header extends Component {
  getRouteHome = () => {
    const { auth } = this.props;
    return auth.user ? '/surveys' : '/';
  }

  renderContent = () => {
    const { auth } = this.props;

    if (auth.isLoading) return '';
    if (!auth.user) return (<li><a href={ROUTES_AUTH_GOOGLE}>Log in with Google</a></li>);
    return [
      <li key="buttonPayments"><Payments /></li>,
      <li key="buttonLogout"><a href={ROUTES_AUTH_LOGOUT}>Logout</a></li>,
    ];
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.getRouteHome()} className="left brand-logo">Logo</Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.shape({
    isLoading: PropTypes.bool,
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
  }).isRequired,
};

/* Export ==================================================================== */
export default connect(mapStateToProps, null)(Header);
