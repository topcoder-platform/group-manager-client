/**
 * New / Edit Group form
 * New -> Show the Checkbox to Add Self
 * Edit -> Show Label as Edit
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormsyForm from 'appirio-tech-react-components/components/Formsy'
import Textarea from 'appirio-tech-react-components/components/Formsy/Textarea'

import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'

const Formsy = FormsyForm.Formsy

import './NewBatchForm.scss'

class NewBatchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valid: false,
      dirty: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onValid = this.onValid.bind(this)
    this.onInvalid = this.onInvalid.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  //Send data to the base handler for saving
  onSubmit(batch) {
    this.props.saveRecord(batch)
  }

  onValid() {
    this.setState({valid: true})
  }

  onInvalid() {
    this.setState({valid: false})
  }

  onChange(currentValues, isChanged) {
    if (this.state.dirty !== isChanged) {
      this.setState({ dirty: isChanged })
    }
  }

  getIsSavingIndicator() {
   
    //If no save in progress, ignore
    if (!this.props.isSaving) {
      return null
    }
    
    //Save in progress, display
    return (
      <div className={'topSpace'}>
        <LoadingIndicator label={'Saving'} />
      </div>
    )
  }

  render() {

    return (
      <div styleName="main">
        <h1 styleName="title">New Batch - Deactivate</h1>
        <div styleName="content">
          <Formsy.Form
            className="profile-settings-form"
            onInvalid={this.onInvalid}
            onValid={this.onValid}
            onValidSubmit={this.onSubmit}
            onChange={this.onChange}
          >
            <div className="section-heading">Batch Detail</div>
        
            {/* Email field with validations applied */}
            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Email Addresses</span>&nbsp;
                <sup styleName="requiredMarker">*</sup>
              </div>
              <Textarea
                wrapperClass="input-field"
                autoResize="false"
                name="emails"
                style={{height: '200px'}}
                value={this.props.newBatch.emails || ''}
                validations={{maxLength: 65000}}
                validationError={'Please enter list of emails to be deactivated'}
                validationErrors={{
                  maxLength: 'Maximum length allowed is 65000',
                }}
                required
              />
              <br/>    
              <div className="italicText">
                Enter emails separated by comma(,), colon(:), semi colons(;) or newlines
                <br/>
                <br/>
                A max of 500 emails are supported in one batch. Please create multiple batches
                if the emails count exceed 500
              </div>
            </div>

            <div className="controls">
              <button
                type="submit"
                className="tc-btn tc-btn-primary"
                disabled={this.props.isSaving || !this.state.valid || !this.state.dirty}
              >
            Save 
              </button>
              {this.getIsSavingIndicator()}
            </div>
          </Formsy.Form>
        </div>
      </div>
    )
  }
}

NewBatchForm.propTypes = {
  values: PropTypes.object,
  saveRecord: PropTypes.func,
  isSaving: PropTypes.bool
}

export default NewBatchForm
