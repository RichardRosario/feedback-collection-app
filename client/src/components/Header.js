import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a  className="waves-effect waves-light btn grey-text text-darken-4" href="auth/google">Google Login</a></li>
        )
      default:
        return (
          <li><a href="api/logout" className="waves-effect waves-light btn grey-text text-darken-4">Log Out</a></li>
        )
    }
  }

  render() {

    return (
    <nav>
      <div className="nav-wrapper  brown lighten-5">
        <Link 
          to={this.props.auth ? '/dashboard' : '/' } 
          className="grey-text text-darken-3 left brand-logo">
          topper
          </Link>
        <ul id="nav-mobile" className="right hide-on-small-and-down">
          {/* <li><a  className="grey-text text-darken-4" href="/dashboard">Dashboard</a></li>
          <li><a  className="grey-text text-darken-4" href="/surveys">New Survey</a></li>
           */}
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