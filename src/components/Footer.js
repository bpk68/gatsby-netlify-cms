import React from 'react'

import SocialLinks from './SocialLinks';

const Footer = class extends React.Component {
  render() {
    return (
      <footer class="site-footer outer">
        <div class="site-footer-inside">
          <SocialLinks />
          <p class="site-info">
            <a href="https://robkendal.co.uk">Kendal Mint Code</a> &copy; {new Date().getFullYear()}.
            Powered by <a target="_blank" href="https://www.gatsbyjs.org/" rel="noreferrer noopener">Gatsby</a> and <a target="_blank" rel="noreferrer noopener" href="https://www.netlify.com/">Netlify</a>.
            </p>
          <p class="back-to-top">
            <a id="top-button" class="top-button" href="#page">
              <span class="fas fa-arrow-up" aria-hidden="true"></span>
              <span class="screen-reader-text">Back to top</span>
            </a>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer
