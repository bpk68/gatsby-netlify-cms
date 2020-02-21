import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
//import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import SocialLinks from '../components/SocialLinks';

export const IndexPageTemplate = ({
  image,
  avatarimage,
  title,
  heading,
  subheading,
  description,
  intro,
}) => (
    <>
      <section
        className="hero is-primary is-medium has-text-dark"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
          backgroundPosition: `top center`,
          backgroundAttachment: `fixed`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`
        }}>
        <div className="hero-body has-text-centered">
          <div className="container">
            <div className="columns">
              <div className="column is-three-fifths is-offset-one-fifth">
                <p className="hero-avatar">
                  <img src={!!avatarimage.childImageSharp ? avatarimage.childImageSharp.fluid.src : avatarimage} className="avatar" alt="Rob Kendal" />
                </p>
                <h1 className="has-text-weight-bold is-size-3-mobile is-size-2-tablet">
                  {title}
                </h1>
                <p>{subheading}</p>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  <div className="columns">
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2">
                        {intro.heading}
                      </h3>
                      <p dangerouslySetInnerHTML={
                        { __html: intro.description }
                      }></p>
                    </div>
                  </div>

                  {/* <Features gridItems={intro.blurbs} /> */}

                  <div className="column is-12">
                    <hr />
                    <p className="subtitle is-size-3">
                      Latest articles
                    </p>
                    <p>&nbsp;</p>
                    <BlogRoll />
                    <div className="column is-12 has-text-centered">
                      <Link className="button is-dark" to="/blog">
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  avatarimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        avatarimage={frontmatter.avatarimage}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        avatarimage {
           childImageSharp {
            fluid(maxWidth: 300, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        description
        intro {
          heading
          description
        }
      }
    }
  }
`
