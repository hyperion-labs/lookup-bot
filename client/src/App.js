/* Variables ==================================================================== */
// libraries
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// custom
import { Header } from './components';
import { Landing } from './views';
import * as actions from './actions';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

/* Redux ==================================================================== */

const mapDispatchToProps = {
  fetchUser: actions.fetchUser,
};

/* App ==================================================================== */
class App extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

/* export ==================================================================== */
export default connect(null, mapDispatchToProps)(App);
