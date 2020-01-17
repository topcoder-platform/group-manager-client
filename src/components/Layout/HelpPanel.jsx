/**
 * Panel to display settings
 *
 * Can be wide or normal
 */
import React from 'react'
import PropTypes from 'prop-types'

import Sticky from 'react-stickynode'
import MediaQuery from 'react-responsive'
import TwoColsLayout from '../TwoColsLayout'
import UserSidebar from '../UserSidebar/UserSidebar'

import { SCREEN_BREAKPOINT_MD } from '../../config/constants'

import './HelpPanel.scss'

const HelpPanel = (props) => (
  <TwoColsLayout>
    <TwoColsLayout.Sidebar>
      <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
        {(matches) => {
          if (matches) {
            return (
              <Sticky top={60}>
                <UserSidebar user={props.user}/>
              </Sticky>
            )
          } else {
            return <UserSidebar user={props.user}/>
          }
        }}
      </MediaQuery>
    </TwoColsLayout.Sidebar>
    <TwoColsLayout.Content>
      <div styleName="main">
        <h1 styleName="title">{props.title}</h1>
        <div styleName="content">{props.children}</div>
      </div>
    </TwoColsLayout.Content>
  </TwoColsLayout>
)

HelpPanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  user: PropTypes.object,
}

export default HelpPanel
