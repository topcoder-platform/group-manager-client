/**
 * Section of notifications from one source
 *
 * Displays source title, "mark all" button and list of notifications
 */
import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup} from 'react-transition-group'

import SectionTitle from '../SectionTitle/SectionTitle'
import SectionItem from '../SectionItem/SectionItem'

import cn from 'classnames'
import './Section.scss'

const Section = (props) => {
  const {title, faqList } = props

  return (
    <div className={cn('notifications-section', props.transitionState)}>
      <SectionTitle
        title={title}
      />
      
      <TransitionGroup className="notification-list">
        {
          faqList.map(faq => {
            return (
              <SectionItem key={faq.id} title={faq.title} details={faq.details} />
            )
          })
        }
      </TransitionGroup>
    </div>
  )
}

Section.propTypes = {
  isSimple: PropTypes.bool,
  isGlobal: PropTypes.bool,
  title: PropTypes.string.isRequired,
  transitionState: PropTypes.string,
  onMarkAllClick: PropTypes.func,
  onViewOlderClick: PropTypes.func,
  total: PropTypes.number,
  isLoading: PropTypes.bool
}

export default Section
