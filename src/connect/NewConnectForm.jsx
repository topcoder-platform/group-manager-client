/**
 * New / Edit Group form
 * New -> Show the Checkbox to Add Self
 * Edit -> Show Label as Edit
 */
import React, { Component } from 'react'
import FormsyForm from 'appirio-tech-react-components/components/Formsy'

import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'

const TCFormFields = FormsyForm.Fields
const Formsy = FormsyForm.Formsy

import './NewConnectForm.scss'

class NewConnectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valid: false,
      dirty: false,
      projectStatus: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onValid = this.onValid.bind(this)
    this.onInvalid = this.onInvalid.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  //Send data to the base handler for saving
  onSubmit(projectData) {
    if (projectData.planned_start_date_dt) {      
      projectData.planned_start_date = this.convertDateToSeconds(projectData.planned_start_date_dt)
    }
    if(projectData.planned_end_date_dt) {
      projectData.planned_end_date = this.convertDateToSeconds(projectData.planned_end_date_dt)
    }

    this.props.saveRecord(projectData, this.state.projectStatus)
  }

  onValid() {
    this.setState({valid: true})
  }

  onInvalid() {
    this.setState({valid: false})
  }

  onChange(propertyName, value) {
    if(propertyName === 'status') {
      this.setState({ projectStatus: value})
    }
    this.setState({dirty: true})
  }

  getIsLoadingIndicator() {
    return (
      <div className={'topSpace'}>
        <LoadingIndicator label={'Loading Project' + this.props.newConnect.Id  + '...'} />
      </div>
    )
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

  convertDateToString(date) {
    return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0)
  }

  convertDateToSeconds(dt) {
    if (dt) {
      return (new Date(dt).getTime() / 1000)
    }
    return null
  }

  convertMillisecondsToDate(projectData) {
    if (projectData.planned_start_date) {
      const dtDecimal = parseInt(projectData.planned_start_date, 10) * 1000
      projectData.planned_start_date_dt = this.convertDateToString(new Date(dtDecimal))
    }
    if (projectData.planned_end_date) {
      const dtDecimal = parseInt(projectData.planned_end_date, 10) * 1000
      projectData.planned_end_date_dt = this.convertDateToString(new Date(dtDecimal))
    }
  }

  getErrorComponent(isError) {
    if(isError) {
      return (
        <div className="notTopgear">Error: Project Data not found. 
          Its likely the project does not belong to Topgear</div>
      )
    }
    return null
  }

  render() {

    let isError = false
    if(this.props.currentConnectLoading) {
      return this.getIsLoadingIndicator()
    }

    if (!this.props.newConnect.details) {
      return null
    }
    let projectData = this.props.newConnect.details.project_data
    if (!projectData) {
      projectData = {}
      isError = true
    }
    this.convertMillisecondsToDate(projectData)
    const errorComponent = this.getErrorComponent(isError)

    return (
      <div styleName="main">
        <h1 styleName="title">New Connect Project - Information Update</h1>
        <div styleName="content">
         
          {/* Connect Project Details - Write Fields */}
          <Formsy.Form
            className="profile-settings-form"
            onInvalid={this.onInvalid}
            onValid={this.onValid}
            onValidSubmit={this.onSubmit}
            onChange={this.onChange}
          >

            <div className="section-heading">Connect Project</div>
          
            {/* Connect Project Details - Read Only */}
            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Connect Project Id</span>&nbsp;
              </div>
              <div>
                {this.props.newConnect.id.toString()}     
              </div>
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Name</span>&nbsp;
              </div>
              <div className="input-field">
                {this.props.newConnect.name}     
              </div>
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Description</span>&nbsp;
              </div>
              <div className="input-field">
                {this.props.newConnect.description}     
              </div>
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Direct Project ID</span>&nbsp;
              </div>
              <div className="input-field">
                {this.props.newConnect.directProjectId}     
              </div>
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Status</span>&nbsp;
              </div>
              <div className="input-field">
                {this.props.newConnect.status}     
              </div>
            </div>

            <div className="section-heading">Update Details</div>

            {errorComponent}
        
            {/* Group Name field with validations applied */}
            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Approved Amount</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="approved_amount"
                value={projectData.approved_amount || ''}
                validations={{isNumeric: true}}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Business Unit</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="bu"
                value={projectData.bu || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Company Code</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="company_code"
                value={projectData.company_code || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Cost Center</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="cost_center"
                value={projectData.cost_center || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Customer Project</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="customer_project"
                value={projectData.customer_project || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">DU</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="du"
                value={projectData.du || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Execution Hub</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="execution_hub"
                value={projectData.execution_hub || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Group Customer Name</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="group_customer_name"
                value={projectData.group_customer_name || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Group Name</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="group_name"
                value={projectData.group_name || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Invoice Type</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="invoice_type"
                value={projectData.invoice_type || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Offshore Efforts</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="offshore_efforts"
                value={projectData.offshore_efforts || ''}
                validations={{isNumeric: true}}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Onsite Efforts</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="onsite_efforts"
                value={projectData.onsite_efforts || ''}
                validations={{isNumeric: true}}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Part Of NG3</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="part_of_ng3"
                value={projectData.part_of_ng3 || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Planned Start Date</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="date"
                name="planned_start_date_dt"
                value={projectData.planned_start_date_dt || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Planned End Date</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="date"
                name="planned_end_date_dt"
                value={projectData.planned_end_date_dt || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Project Classification Code</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="project_classification_code"
                value={projectData.project_classification_code || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Project Code</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="project_code"
                value={projectData.project_code || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Sector</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="sector"
                value={projectData.sector || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">SMU</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="smu"
                value={projectData.smu || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Sow Number</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="sow_number"
                value={projectData.sow_number || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Sub Execution Hub</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="sub_execution_hub"
                value={projectData.sub_execution_hub || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">Vertical</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="vertical"
                value={projectData.vertical || ''}
              />
            </div>

            <div className="field">
              <div className="label">
                <span styleName="fieldLabelText">WBS Code</span>&nbsp;
              </div>
              <TCFormFields.TextInput
                wrapperClass="input-field"
                type="text"
                name="wbs_code"
                value={projectData.wbs_code || ''}
              />
            </div>

            <div className="controls">
              <button
                type="submit"
                className="tc-btn tc-btn-primary"
                disabled={this.props.isSaving || !this.state.valid || !this.state.dirty}
              >
            Save 
              </button>
                &nbsp;&nbsp;
              <button
                className="tc-btn tc-btn-secondary"
                onClick={this.props.resetNewConnectId}
              >
            Reset 
              </button>
              {this.getIsSavingIndicator()}
            </div>
          </Formsy.Form>
        </div>
      </div>
    )
  }
}

export default NewConnectForm
