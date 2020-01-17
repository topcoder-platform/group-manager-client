import React from 'react'
import moment from 'moment'
import './FooterV2.scss'

const FooterV2 = () => (
  <div className="footer-v2">
    <ul className="footer-links">
      <li><a href="https://www.topcoder.com/company/" target="_blank">About</a></li>
      <li><a href="https://github.com/topcoder-platform/group-manager/issues" target="_blank">Log Issues</a></li>
    </ul>
    <div className="footer-copyright">
      © Topcoder { moment().format('YYYY') }
    </div>
  </div>
)

export default FooterV2
