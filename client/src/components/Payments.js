import React, { Component } from 'react';
import {connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout 
        name="Topper" 
        description="2$ for 10 survey credits" 
        amount={200} 
        token ={token => this.props.handleToken(token)} 
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="green btn-flat yellow-text" >Add Credits</button>
      </StripeCheckout>
    );
  }
}



export default connect(null, actions)(Payments);