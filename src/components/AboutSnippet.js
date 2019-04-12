import React from 'react'
//import PropTypes from 'prop-types'

const AboutSnippet = props => (
    <div className="author-box">
        <div className="author-avatar">
            <img src="/content/images/size/w150/2018/05/38687284.jpg" alt="Rob Kendal" className="avatar" />
        </div>
        <div className="author-details">
            <h2 className="author-title">About Rob Kendal</h2>
            <p className="author-description">
                Rob Kendal is an award-winning front-end developer and marketer who likes simple, organised thinking and making clever things.
                 You can find him working at IAM Cloud. Say hi on me@robkendal.co.uk.
            </p>
        </div>
    </div>
)

// Content.propTypes = {
//     content: PropTypes.node,
//     className: PropTypes.string,
// }

export default AboutSnippet