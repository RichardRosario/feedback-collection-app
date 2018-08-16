import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';

const FIELDS = [
  { label: 'Survey Title', name: 'title'},
  { label: 'Email Body', name: 'body'},
  { label: 'Subject Line', name: 'subject'},
  { label: 'Recipient List', name: 'email'}
]

class SurveyFrom extends Component {
  renderFields() {
   return _.map(FIELDS, ({ label, name }) => {
     return ( 
      <Field 
        key={name} 
        component={SurveyField} 
        type="text" 
        label={label} 
        name={name} 
      />
    );
   })
  }

  render() {
    return (
      <div>
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
      {this.renderFields()}
        <button><Link to="/" className="light-grey btn-flat left gray-text">Cancel</Link></button>
        <button type="submit" className="green btn-flat right white-text">Next
        <i className="material-icons right">done</i>
        </button>
      </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'Please provide a value for this field*'
    }
  })


  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyFrom);