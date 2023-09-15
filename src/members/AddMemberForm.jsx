import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormsyForm from 'appirio-tech-react-components/components/Formsy'
import Textarea from 'appirio-tech-react-components/components/Formsy/Textarea'

const TCFormFields = FormsyForm.Fields
const Formsy = FormsyForm.Formsy

import LoadingIndicator from './../components/LoadingIndicator/LoadingIndicator'

import './AddMemberForm.scss'

const opts = [
  {
    value: 'user',
    label: 'User'
  },
  {
    value: 'childGroup',
    label: 'Child Group'
  },
]

class AddMemberForm extends Component {
  constructor(props) {
    super(props)
    const message = this.getMessage('user')

    this.state = {
      valid: false,
      dirty: false,
      entries: '',
      membershipType:'user',
      message
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onValid = this.onValid.bind(this)
    this.onInvalid = this.onInvalid.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(data) {
    this.props.addMembers(this.props.currentGroup.id, data)
  }

  onValid() {
    this.setState({valid: true})
  }

  onInvalid() {
    this.setState({valid: false})
  }

  getMessage(membershipType) {
    let message = 'user handles or emails' 
    if (membershipType === 'childGroup') {
      message = 'child group ids (Guids) '
    }
    return `Enter ${message} separated by comma(,), colon(:), semi colons(;) or newlines`
  }

  onChange(currentValues, isChanged) {
    if (this.state.dirty !== isChanged) {
      this.setState({ dirty: isChanged })
    }
    
    this.setState({ message: this.getMessage(currentValues.membershipType) })
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
    const { currentGroup } = this.props

    return (
      <div styleName="main-add-member">
        <div styleName="content">
          <Formsy.Form
            className="add-member-form"
            onInvalid={this.onInvalid}
            onValid={this.onValid}
            onValidSubmit={this.onSubmit}
            onChange={this.onChange}
          >
            <div className="section-heading">Add Group Members:  {currentGroup.name}</div>
        
            {/* Radio Group Option Member Type 
            <div className="field" style={{display:'none'}}>
              <div className="label">
                <span styleName="fieldLabelText">Member Type</span>&nbsp;
                <sup styleName="requiredMarker">*</sup>
              </div>
              <TCFormFields.RadioGroup
                name="membershipType"
                options={opts}
                onChange={this.onChange} 
                value={this.state.membershipType}
                required
              />
            </div>
            */}

            {/* Text Area field to capture the handle / email or Child Group Id */}
            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Enter Members</span>
                <sup styleName="requiredMarker">*</sup>
              </div>
              <Textarea
                wrapperClass="input-field"
                autoResize="true"
                name="handleStr"
                value={this.state.entries || ''}
                validations={{maxLength: 1024}}
                validationError={'The field is required'}
                validationErrors={{
                  maxLength: 'Length cannot exceed 1024 characters',
                }}
                required
              />
            </div>
            <div className="italicText">{this.state.message}</div>
            <br/>
            <div className="italicText">
              Recommended to add a max of 10-15 users at a time
            </div>

            <div className="controls">
              <button
                type="submit"
                className="tc-btn tc-btn-primary"
                disabled={this.props.isSaving || !this.state.valid || !this.state.dirty}
              >
              Add Members
              </button>
              {this.getIsSavingIndicator()}
            </div>
          </Formsy.Form>
        </div>
      </div> 
    )
  }
}

AddMemberForm.propTypes = {
  values: PropTypes.object,
  addMembers: PropTypes.func,
  currentGroup: PropTypes.object
}

export default AddMemberForm
