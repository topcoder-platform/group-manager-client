import React from 'react'
import MenuBar from 'appirio-tech-react-components/components/MenuBar/MenuBar'
import moment from 'moment'
import MediaQuery from 'react-responsive'
import FooterV2 from '../FooterV2/FooterV2'
import { SCREEN_BREAKPOINT_MD } from '../../config/constants'

require('./Footer.scss')

const Footer = () => {
  const currentYear = moment().format('YYYY')
  const otherNavigationItems = [
    {img: '', text: 'About', link: 'https://www.topcoder.com/company/', target: '_blank'},
    {img: '', text: 'Contact us', link: 'https://www.topcoder.com/contact-us/', target: '_blank'},
    {img: '', text: 'Privacy', link: 'https://www.topcoder.com/privacy-policy/', target: '_blank'},
    {img: '', text: 'Terms', link: 'https://connect.topcoder.com/terms', target: '_blank'},
    {img: '', text: 'Our Process', link: 'https://www.topcoder.com/solutions/how-it-works/', target: '_blank'}
  ]
  
  // TODO this looks like a bad way of doing it, I think it should be re-factored
  const shouldHideOnDesktop = true 
  // on mobile show footer only when user is logged-out, so only root page is available
  const shouldHideOnMobile =  window.location.pathname !== '/'

  return (
    <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
      {(matches) => {
        if (matches) {
          return (shouldHideOnDesktop ? null :
            <div className="Footer">
              <p className="copyright-notice">© Topcoder { currentYear }</p>
              <div className="footer-menu">
                <MenuBar items={otherNavigationItems} orientation="horizontal" mobileBreakPoint={SCREEN_BREAKPOINT_MD - 1} />
              </div>
            </div>
          )
        } else {
          return (shouldHideOnMobile ? null :
            <FooterV2 />
          )
        }
      }}
    </MediaQuery>
  )
}

export default Footer
