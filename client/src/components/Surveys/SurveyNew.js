import React, { Component } from 'react';
import Surveyform from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if(this.state.showFormReview) {
      return <SurveyFormReview onCancel={() => this.setState({showFormReview: false })} />
    }

    return <Surveyform onSurveySubmit={() => this.setState({showFormReview: true })} />
  }

  render() {
    return (
      <div>
        <h4>New Survey</h4>
        {this.renderContent()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);