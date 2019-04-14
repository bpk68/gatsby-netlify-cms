import React from 'react'

import SocialLinks from './SocialLinks';

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="site-footer outer">
        <div className="site-footer-inside">
          <SocialLinks />
          <p className="site-info">
            <a href="https://robkendal.co.uk">Kendal Mint Code</a> &copy; {new Date().getFullYear()}.
            Powered by <a target="_blank" href="https://www.gatsbyjs.org/" rel="noreferrer noopener">Gatsby</a> and <a target="_blank" rel="noreferrer noopener" href="https://www.netlify.com/">Netlify</a>.
            </p>
          <p className="back-to-top">
            <a id="top-button" className="top-button" href="#page">
              <span className="fas fa-arrow-up" aria-hidden="true"></span>
              <span className="screen-reader-text">Back to top</span>
            </a>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer
