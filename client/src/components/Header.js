import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a  className="btn grey-text text-lighten-4" href="auth/google">Google Login</a></li>
        )
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="2" style={{ margin: '0 10px' }} className="grey-text text-darken-4">
          Credits: {this.props.auth.credits}</li>,
          <li key="3"><a href="api/logout" className="grey-text text-darken-4">LogOut</a></li>
        ]
    }
  }

  render() {

    return (
    <nav>
      <div className="nav-wrapper  brown lighten-5">
        <Link 
          to={this.props.auth ? '/surveys' : '/' } 
          className="grey-text text-darken-3 left brand-logo">
          topper
          </Link>
        <ul id="nav-mobile" className="right hide-on-small-and-down">
          {this.renderContent()}
        </ul>
      </div>
    </nav>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);