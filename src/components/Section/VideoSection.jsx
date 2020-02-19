/**
 * Section of notifications from one source
 *
 * Displays source title, "mark all" button and list of notifications
 */
import React from 'react'
import PropTypes from 'prop-types'

import SectionTitle from '../SectionTitle/SectionTitle'

import cn from 'classnames'
import './Section.scss'

const VideoSection = (props) => {
  return (
    <div className={cn('notifications-section', props.transitionState)}>
      <SectionTitle
        title={props.title}
      />
      <div className="video-container">
        <video width="640" height="360" controls>
          <source src="./static/help.mp4" type="video/mp4" />
        </video>
        <div className="video-courtesy">
           Video credits: jaya.dhaka
        </div>
      </div>
     

    </div>
  )
}

VideoSection.propTypes = {
  title: PropTypes.string.isRequired,
  transitionState: PropTypes.string,
}

export default VideoSection
