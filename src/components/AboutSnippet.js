import React from 'react'
//import PropTypes from 'prop-types'

const AboutSnippet = props => (
    <div className="author-box box">
        <div className="media">
            <div className="media-left">
                <div className="author-avatar">
                    <img src="/img/38687284.jpg" alt="Rob Kendal" className="avatar" />
                </div>
            </div>
            <div className="media-content content is-small">
                <h3 className="author-title">About Rob Kendal</h3>
                <p className="author-description">
                    Rob Kendal is an award-winning front-end developer and marketer who likes simple, organised thinking and making clever things.
                     You can find him working at <a href="https://www.iamcloud.com" rel="noopener noreferrer" target="_blank">IAM Cloud</a>. Say hi on me@robkendal.co.uk.
                </p>
            </div>
        </div>
    </div>
)

// Content.propTypes = {
//     content: PropTypes.node,
//     className: PropTypes.string,
// }

export default AboutSnippet