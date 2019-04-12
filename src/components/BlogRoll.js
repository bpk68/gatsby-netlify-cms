import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image';

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="post-feed">
        {posts &&
          posts.map(({ node: post }) => (

            <article className={`blog-post ${post.frontmatter.featured ? 'featured' : 'media'}`}>
              {
                !post.frontmatter.featured ?
                  <figure className="media-left">
                    <Link className="post-thumbnail" to={post.fields.slug}>
                      <Img
                        fluid={post.frontmatter.featuredimage.childImageSharp.fluid}
                        fadeIn={true}
                        alt="blog post thumbnail"
                      />
                    </Link>
                  </figure>
                  : ''
              }
              <div className="media-content">
                <div className="post-meta">
                  <p className="subtitle is-size-6 is-block is-uppercase has-text-grey-light">
                    <time className="published" datetime={post.frontmatter.date}>
                      {
                        post.frontmatter.featured ?
                          <span className="has-text-primary">Featured / </span>
                          : ''
                      }
                      {post.frontmatter.date}
                    </time>
                  </p>
                  <h2 className={`post-title title ${post.frontmatter.featured ? 'is-size-2' : 'is-size-4'}`}>
                    <Link to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                </div>
                <div className="post-content">
                  {
                    post.frontmatter.featured ?
                      <figure className="media-left">
                        <Link className="post-thumbnail" to={post.fields.slug}>
                          <Img
                            fluid={post.frontmatter.featuredimage.childImageSharp.fluid}
                            fadeIn={true}
                            alt="blog post thumbnail"
                          />
                        </Link>
                      </figure>
                      : ''
                  }
                  <p>
                    {
                      post.frontmatter.description ?
                        post.frontmatter.description
                        : post.excerpt
                    }
                  </p>
                  <p className="post-tags tags">
                    {
                      post.frontmatter.tags.map(tag => (
                        <Link
                          key={tag + `tag`}
                          to={`/tags/${kebabCase(tag)}/`}
                          className="tag is-white has-text-primary is-rounded">
                          #{tag}
                        </Link>
                      ))
                    }
                  </p>
                  {
                    post.frontmatter.featured ?
                      <p className="read-more">
                        <Link
                          to={post.fields.slug}
                          className="button is-primary is-rounded"
                        >
                          Continue Reading
                      </Link>
                      </p>
                      : ''
                  }
                </div>
              </div>
            </article>
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { 
            frontmatter: { 
              templateKey: { eq: "blog-post" },
              title: { regex: "/^((?!DRAFT).)*$/"  }
            } 
          }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                description
                featured
                date(formatString: "DD MMMM, YYYY")
                tags
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 900, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }  
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
