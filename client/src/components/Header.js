/* Variables ==================================================================== */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Redux ==================================================================== */

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

/* App ==================================================================== */

class Header extends Component {
  renderContent = () => {
    const { auth } = this.props;

    if (auth.isLoading) return '';
    if (!auth.user) return (<li><a href="/auth/google">Log in with Google</a></li>);
    return (<li><a href="auth/logout">Logout</a></li>);
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="left brand-logo">Logo</a>
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
