/**
 * New Group Container, which houses the New Group form
 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './NewBatchContainer.scss'

import MediaQuery from 'react-responsive'
import Sticky from '../components/Sticky'
import TwoColsLayout from '../components/TwoColsLayout'

import { saveBatch, loadAllBatches } from '../actions/loadBatches'

import NewBatchForm from './NewBatchForm'
import BatchInfoContainer from './BatchInfoContainer'

import { SCREEN_BREAKPOINT_MD } from '../config/constants'

class NewBatchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.createBatch = this.createBatch.bind(this)
  }

  toggleDrawer() {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  createBatch(batch) {
    console.log('Helo weereererer')
    this.props.saveBatch(batch)
      .then(() => {
        console.log('heree')
        this.props.loadAllBatches(false)
        this.props.history.push('/batches')
      })
  }

  render() {
    const leftArea = (
      <BatchInfoContainer />
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
          <NewBatchForm 
            saveRecord={this.createBatch}  
            newBatch={{emails:''}}
            isSaving={this.props.isSaving}
          />  
        </TwoColsLayout.Content>
      </TwoColsLayout>
    )
  }
}

const mapStateToProps = ({ batch }) => {
  return {
    isSaving: batch.isSaving
  }
}


const mapDispatchToProps = {
  saveBatch,
  loadAllBatches
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewBatchContainer))
