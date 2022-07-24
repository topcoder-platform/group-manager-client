/**
 * New / Edit Bulk Form Upload form
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormsyForm from 'appirio-tech-react-components/components/Formsy'
import Textarea from 'appirio-tech-react-components/components/Formsy/Textarea'
import BulkUploadFilePicker from '../components/FilePicker/BulkUploadFilePicker'

import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'

const TCFormFields = FormsyForm.Fields
const Formsy = FormsyForm.Formsy

import './NewBulkUploadForm.scss'

class NewBulkUploadForm extends Component {
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
    this.onFileChange = this.onFileChange.bind(this)
  }

  //Send data to the base handler for saving
  onSubmit(bulkUpload) {
    this.props.saveRecord(bulkUpload)
  }

  onValid() {
    this.setState({valid: true})
  }

  onInvalid() {
    this.setState({valid: false})
  }

  onFileChange(file) {
    this.props.newBulkUpload.file = file
    this.onChange(file, true)
  }

  onChange(currentValues, isChanged) {
    console.log('On change....')

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
        <h1 styleName="title">New Bulk Upload Operation</h1>
        <div styleName="content">
          <Formsy.Form
            className="profile-settings-form"
            onInvalid={this.onInvalid}
            onValid={this.onValid}
            onValidSubmit={this.onSubmit}
            onChange={this.onChange}
          >

            <div className="section-heading">File Detail</div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">File </span>&nbsp;
              </div>
              <BulkUploadFilePicker onFileChange={this.onFileChange} />
              <div className="italicText">
                Provide the CSV file with the details
                <br/>
              </div>
            </div>

               
        
            {/* Friendly Name for File Upload Component */}
            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Name</span>&nbsp;
              </div>
              <Textarea
                wrapperClass="input-field"
                autoResize="false"
                name="name"
                style={{height: '200px'}}
                value={this.props.newBulkUpload.name || ''}
                validations={{maxLength: 255}}
                validationErrors={{
                  maxLength: 'Maximum length allowed is 255',
                }}
              />
              <br/>    
              <div className="italicText">
                Enter a user friendly name to refer to this upload, if no name is specified the uploaded file name is used
                <br/>
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

NewBulkUploadForm.propTypes = {
  values: PropTypes.object,
  saveRecord: PropTypes.func,
  isSaving: PropTypes.bool
}

export default NewBulkUploadForm
