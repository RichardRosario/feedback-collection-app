import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>New Survey</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/surveys" component={SurveyNew} /> 
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions )(App);