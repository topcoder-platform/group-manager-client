import React, { Component } from 'react'
import { HOC as hoc } from 'formsy-react'
import classNames from 'classnames'

class BulkUploadFilePicker extends Component {

  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
    this.setFilePickerRef = this.setFilePickerRef.bind(this)
    this.setDomInputRef = this.setDomInputRef.bind(this)
    this.filePicker = null
    this.domInputRef = null
    this.value = ''
  }

  setFilePickerRef(element) {
    this.filePicker = element
  }

  setDomInputRef(element) {
    this.domInputRef = element
  }

  focus() {
    if (!this.domInputRef) return
    this.domInputRef.focus()
  }

  // eslint-disable-next-line no-unused-vars
  changeValue(e) {

    const inputFile = document.getElementById('groupFile')
    const value = inputFile.files[0]
    this.value = value

    //const value = e.target.value
    this.props.setValue(value)
    this.props.onChange(this.props.name, value)
  }



  render() {

    const hasError = !this.props.isPristine() && !this.props.getValue()
    const classes = classNames('tc-textarea', {error: hasError}, {empty: !this.props.getValue()})

    // const disabled = this.props.isFormDisabled() || this.props.disabled
    const errorMessage = this.props.getErrorMessage() || this.props.validationError

    return (
      <div>
        <input type="file" name={name} className={classes} id="groupFile" required onChange={this.changeValue} />
        { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}

export default hoc(BulkUploadFilePicker)