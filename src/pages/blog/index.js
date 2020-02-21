import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section
          className="hero is-primary is-medium has-text-dark"
          style={{
            backgroundImage: `url('/img/trianglify.png')`,
            backgroundPosition: `top center`,
            backgroundAttachment: `fixed`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`
          }}
        >
          <div className="hero-body has-text-centered">
            <div className="container">
              <h1 className="has-text-weight-bold is-size-3-mobile is-size-2-tablet">
                Latest stories
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
