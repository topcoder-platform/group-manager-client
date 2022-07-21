/**
 * New Group Container, which houses the New Group form
 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './NewBulkUploadContainer.scss'

import MediaQuery from 'react-responsive'
import Sticky from '../components/Sticky'
import TwoColsLayout from '../components/TwoColsLayout'

import { saveBulkUpload, getBulkUploads } from '../actions/loadBulkUpload'

import NewBulkUploadForm from './NewBulkUploadForm'
import BulkUploadInfoContainer from './BulkUploadInfoContainer'

import { SCREEN_BREAKPOINT_MD } from '../config/constants'

class NewBulkUploadContainer extends React.Component {
  constructor(props) {
    super(props)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.createBulkUpload = this.createBulkUpload.bind(this)
  }

  toggleDrawer() {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  createBulkUpload(bulkUpload) {
    this.props.saveBulkUpload(bulkUpload)
      .then(() => {
        this.props.getBulkUploads(false)
        this.props.history.push('/bulkUpload')
      })
  }

  render() {
    const leftArea = (
      <BulkUploadInfoContainer />
    )
    return (
      <TwoColsLayout>
        <TwoColsLayout.Sidebar>
          <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
            {(matches) => {
              if (matches) {
                return <Sticky top={60}>{leftArea}</Sticky>
              } else {
                return leftArea
              }
            }}
          </MediaQuery>
        </TwoColsLayout.Sidebar>

        <TwoColsLayout.Content>
          <NewBulkUploadForm 
            saveRecord={this.createBulkUpload}  
            newBulkUpload={{name:''}}
            isSaving={this.props.isSaving}
          />  
        </TwoColsLayout.Content>
      </TwoColsLayout>
    )
  }
}

const mapStateToProps = ({ bulkUpload }) => {
  return {
    isSaving: bulkUpload.isSaving
  }
}


const mapDispatchToProps = {
  saveBulkUpload,
  getBulkUploads
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewBulkUploadContainer))
