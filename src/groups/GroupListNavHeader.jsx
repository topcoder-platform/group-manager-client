require('./GroupListNavHeader.scss')

import _ from 'lodash'
import React, { Component } from 'react'
import PT from 'prop-types'
import CardView from '../assets/icons/ui-16px-2_grid-45-gray.svg'
import GridView from '../assets/icons/grid-list-ico.svg'
import RefreshIcon from '../assets/icons/refresh8x8.svg'

export default class GroupListNavHeader extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.switchViews = this.switchViews.bind(this)
    this.refreshClick = this.refreshClick.bind(this)
  }
  componentWillMount() {
   
    this.setState({
      selectedView: this.props.currentView
    })
  }

  refreshClick(e) {
    e.preventDefault()
    this.props.refresh()
  }

  switchViews(e) {
    e.preventDefault()
    if (this.state.selectedView === e.currentTarget.dataset.view)
      return
    this.setState({selectedView: e.currentTarget.dataset.view})
    this.props.changeView(e.currentTarget.dataset.view)
  }



  render() {
    return (
      <nav className="list-nav-container">
        <div className="left-wrapper">
          All Groups ( {this.props.groups.length} )
          <a href="javascript:void(0)" className={'refresh-icon'} onClick={this.refreshClick}>
            <RefreshIcon height={16}/>
          </a>
        </div>
        
        <div className="right-wrapper">
          <div className="list-nav-item nav-icon">
            <a href="javascript;" data-view="grid" onClick={this.switchViews} className={`list-nav-btn sm right ${(this.state.selectedView === 'grid') ? 'active' : ''}`}>
              <GridView className="grid-view-ico" />
            </a>
          </div>
          <div className="list-nav-item nav-icon">
            <a href="javascript;" data-view="card" onClick={this.switchViews} className={`list-nav-btn sm right ${(this.state.selectedView === 'card') ? 'active' : ''}`}>
              <CardView className="card-view-ico" />
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
GroupListNavHeader.propTypes = {
  changeView: PT.func,
  currentView: PT.string,
  groups: PT.instanceOf(Array)
}
