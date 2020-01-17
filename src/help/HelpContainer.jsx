import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'

import Sticky from './../components/Sticky'
import { SCREEN_BREAKPOINT_MD } from './../config/constants'

import FooterV2 from './../components/FooterV2/FooterV2'

import TwoColsLayout from './../components/TwoColsLayout'
import UserSidebar from './../components/UserSidebar/UserSidebar'
import Section from './../components/Section/Section'
import VideoSection from './../components/Section/VideoSection'
import SectionTitle from './../components/SectionTitle/SectionTitle'

import { getFaqList } from './../helpers/faqHelper'

import './HelpContainer.scss'

const HelpContainerView = (props) => {
  const { user }  = props
  const faqList = getFaqList()

  return (
    <TwoColsLayout noPadding>
      <TwoColsLayout.Sidebar>
        <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
          {(matches) => {
            if (matches) {
              return (
                <Sticky top={60}>
                  <UserSidebar user={user}/>
                </Sticky>
              )
            } else {
              return <UserSidebar user={user}/>
            }
          }}
        </MediaQuery>
      </TwoColsLayout.Sidebar>
      <TwoColsLayout.Content>
        <div className="notifications-container">
          <div className="content">
            <SectionTitle title="FAQ and Help Video" isTop />  
            <VideoSection title="Video" />
            <Section title="FAQ" faqList={faqList} />
            <FooterV2 />
          </div>
        </div>
      </TwoColsLayout.Content>
    </TwoColsLayout>
  )
}

class HelpContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    document.title = 'Topcoder Group Manager - Help'
  }

  render() {
    const { user } = this.props
   
    return (
      <HelpContainerView user = {user}/>
    )
  }
}

const mapStateToProps = ({ loadUser }) => {
  return { 
    user: loadUser.user 
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpContainer)