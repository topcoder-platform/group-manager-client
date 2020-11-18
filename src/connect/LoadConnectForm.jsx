/**
 * New / Edit Group form
 * New -> Show the Checkbox to Add Self
 * Edit -> Show Label as Edit
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormsyForm from 'appirio-tech-react-components/components/Formsy'
import Textarea from 'appirio-tech-react-components/components/Formsy/Textarea'
import Checkbox from 'appirio-tech-react-components/components/Formsy/Checkbox'

import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'

const TCFormFields = FormsyForm.Fields
const Formsy = FormsyForm.Formsy

import './NewConnectForm.scss'

class LoadConnectForm extends Component {
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
  onSubmit(connect) {
    this.props.loadConnect(connect)
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
        <LoadingIndicator label={'Loading'} />
      </div>
    )
  }

  render() {

    return (
      <div styleName="main">
        <h1 styleName="title">Load Connect Project - Information Update</h1>
        <div styleName="content">
          <Formsy.Form
            className="profile-settings-form"
            onInvalid={this.onInvalid}
            onValid={this.onValid}
            onValidSubmit={this.onSubmit}
            onChange={this.onChange}
          >
            <div className="section-heading">Connect Project</div>
        
            {/* Email field with validations applied */}
            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Connect Project Id</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="id"
                value={this.props.newConnect.id || ''}
              />
              <br/>    
            </div>

            <div className="controls">
              <button
                type="submit"
                className="tc-btn tc-btn-primary"
                disabled={this.props.isSaving || !this.state.valid || !this.state.dirty}
              >
                Load Project 
              </button>
              {this.getIsSavingIndicator()}
            </div>
          </Formsy.Form>
        </div>
      </div>
    )
  }
}

LoadConnectForm.propTypes = {
  values: PropTypes.object,
  saveRecord: PropTypes.func,
  isSaving: PropTypes.bool
}

export default LoadConnectForm
