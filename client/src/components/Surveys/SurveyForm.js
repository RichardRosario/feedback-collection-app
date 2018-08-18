import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';



class SurveyFrom extends Component {
  renderFields() {
   return _.map(formFields, ({ label, name }) => {
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
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
      {this.renderFields()}
        <button className="red btn-flat left white-text">
          <Link to="/surveys" className="white-text">Cancel</Link>
          <i className="material-icons right">not_interested</i>
          </button>
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

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'Please provide a value for this field*'
    }
  })

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyFrom);