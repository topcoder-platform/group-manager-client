/**
 * New Group Container, which houses the New Group form
 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './NewConnectContainer.scss'

import MediaQuery from 'react-responsive'
import Sticky from '../components/Sticky'
import TwoColsLayout from '../components/TwoColsLayout'

import { saveConnect, loadAllConnect, loadConnect, resetNewConnectId } from '../actions/loadConnect'

import NewConnectForm from './NewConnectForm'
import LoadConnectForm from './LoadConnectForm'
import ConnectInfoContainer from './ConnectInfoContainer'

import { SCREEN_BREAKPOINT_MD } from '../config/constants'

class NewConnectContainer extends React.Component {
  constructor(props) {
    super(props)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.saveConnect = this.saveConnect.bind(this)
    this.loadConnectProject = this.loadConnectProject.bind(this)
  }

  toggleDrawer() {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  componentWillUnmount() {
    this.props.resetNewConnectId()
  }

  loadConnectProject(connect){
    this.props.loadConnect(connect.id)
  }

  saveConnect(connect) {
    this.props.saveConnect(connect)
      .then(() => {
        this.props.loadAllConnect(false)
        this.props.history.push('/connect')
      })
  }

  render() {
    const leftArea = (
      <ConnectInfoContainer />
    )

    let displayForm = null
    // if id is defined use the New Connect form else Load
    if(this.props.currentConnect && this.props.currentConnect.id) {
      displayForm = (
        <NewConnectForm
          newConnect={this.props.currentConnect}
          isSaving={this.props.isSaving}
          saveRecord={this.saveConnect}
          resetNewConnectId={this.props.resetNewConnectId}
        />
      ) 
    }
    else {
      displayForm =  (
        <LoadConnectForm 
          loadConnect={this.loadConnectProject}
          newConnect={this.props.currentConnect}
          isSaving={this.props.currentConnectLoading}
        />)  
    }


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
          {displayForm}
        </TwoColsLayout.Content>
      </TwoColsLayout>
    )
  }
}

const mapStateToProps = ({ connect }) => {
  return {
    isSaving: connect.isSaving,
    currentConnect: connect.currentConnect
  }
}


const mapDispatchToProps = {
  loadConnect,
  loadAllConnect,
  saveConnect,
  resetNewConnectId
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewConnectContainer))
