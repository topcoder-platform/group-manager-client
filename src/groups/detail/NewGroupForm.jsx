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
import Select from 'appirio-tech-react-components/components/Formsy/FormsySelect'

import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'

const TCFormFields = FormsyForm.Fields
const Formsy = FormsyForm.Formsy

import './NewGroupForm.scss'

class NewGroupForm extends Component {
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
  onSubmit(group) {
    if (this.props.editGroup.id) {
      group.id = this.props.editGroup.id
    }
    this.props.saveRecord(group)
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


  getActiveStatusEdit() {

    if (this.props.isNew) {
      return null
    }
    return (
      <div className="field">
        <div className="label">
          <span styleName="fieldLabelText">Status</span>&nbsp;
          <sup styleName="requiredMarker">*</sup>
        </div>
        <Select
          wrapperClass="input-field"
          autoResize="true"
          name="status"
          value={this.props.editGroup.status || 'active'}
          options = {[
            {value:'active', label: 'Active'},
            {value:'inactive', label: 'InActive'}
          ]}
          required
        />
        <div className="helpText">
            ( An inactive group will not be visible in listview )
        </div>
      </div>
      
    )
  }

  getAddSelfToGroup() {
    if (this.props.isNew) {
      return ( <div className="field">
        <div className="label">
          <span styleName="fieldLabelText">Add Self to Group</span>&nbsp;
        </div>
        <Checkbox
          wrapperClass="input-field"
          name="addSelf"
          value={this.props.editGroup.addSelf || false}
        />
      </div>)
    }
    return null
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

    const { isNew } = this.props 

    return (
      <div styleName="main">
        <h1 styleName="title">{isNew ? 'New Group' : 'Edit Group'}</h1>
        <div styleName="content">
          <Formsy.Form
            className="profile-settings-form"
            onInvalid={this.onInvalid}
            onValid={this.onValid}
            onValidSubmit={this.onSubmit}
            onChange={this.onChange}
          >
            <div className="section-heading">Group Detail</div>
        
            {/* Group Name field with validations applied */}
            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Group Name</span>&nbsp;
                <sup styleName="requiredMarker">*</sup>
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="name"
                value={this.props.editGroup.name || ''}
                validations={{matchRegexp: /^Wipro - Topgear - /, minLength:20, maxLength: 255}}
                validationError={'Please enter group name'}
                validationErrors={{
                  matchRegexp: 'Group name must start with Wipro - Topgear - ',
                  maxLength: 'Group name cannot exceed 255 characters',
                  minLength: 'Group name must be of mininum 20 characters including Wipro - Topgear - '
                }}
                required
              />
            </div>

            {/* Group Description field with validations applied */}
            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Description</span>&nbsp;
                <sup styleName="requiredMarker">*</sup>
              </div>
              <Textarea
                wrapperClass="input-field"
                autoResize="true"
                name="description"
                value={this.props.editGroup.description || ''}
                validations={{maxLength: 255}}
                validationError={'Please enter group description'}
                validationErrors={{
                  maxLength: 'Group description cannot exceed 255 characters',
                }}
                required
              />
            </div>

            {/* Show Edit status during group edit */}    
            {this.getActiveStatusEdit()}    

            {/* Add Self to the new group */}
            {this.getAddSelfToGroup()}    

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

NewGroupForm.propTypes = {
  values: PropTypes.object,
  saveRecord: PropTypes.func,
  isNew: PropTypes.bool,
  isSaving: PropTypes.bool
}

export default NewGroupForm
