import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage';



const getRelatedPosts = (arrayToQuery, count) => {
  // Make a copy of the array
  const tmp = arrayToQuery.slice(arrayToQuery);
  let ret = [];

  for (var i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * tmp.length);
    const removed = tmp.splice(index, 1);
    // Since we are only removing one element
    ret.push(removed[0]);
  }
  return ret;
}



class BlogRoll extends React.Component {
  render() {
    const { data, relatedTags, excludePostId } = this.props
    const { edges: posts } = data.allMarkdownRemark
    let filteredPosts = posts;
    let relatedPosts = false;

    // related posts filtering
    if (relatedTags && relatedTags.length) {
      filteredPosts = posts.filter(post => {
        if (post.node.id === excludePostId) {
          return false;
        }
        if (post.node.frontmatter.tags && post.node.frontmatter.tags.length) {
          return relatedTags.filter(relatedTag => post.node.frontmatter.tags.includes(relatedTag)).length > 0;
        }

        return false;
      });

      filteredPosts = getRelatedPosts(filteredPosts, 3);
      relatedPosts = true;
    }

    return (
      <div className={`post-feed ${relatedPosts ? 'related-posts' : ''}`}>
        {filteredPosts &&
          filteredPosts.map(({ node: post }) => (


            <article
              key={`post-${post.id}`}
              className={`blog-post ${post.frontmatter.featured && !relatedPosts ? 'featured' : 'media'}`}
            >
              {
                !post.frontmatter.featured || relatedPosts ?
                  <figure className="media-left">
                    <Link className="post-thumbnail" to={post.fields.slug}>
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${
                            post.title
                            }`,
                        }}
                      />
                    </Link>
                  </figure>
                  : ''
              }
              <div className="media-content">
                <div className="post-meta">
                  <p className="subtitle is-size-6 is-block is-uppercase has-text-grey-light">
                    <time className="published" dateTime={post.frontmatter.date}>
                      {
                        post.frontmatter.featured ?
                          <span className="has-text-primary">Featured / </span>
                          : ''
                      }
                      {post.frontmatter.date}
                    </time>
                  </p>
                  <h2 className={`post-title title ${post.frontmatter.featured && !relatedPosts ? 'is-size-2' : 'is-size-4'}`}>
                    <Link to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                </div>
                <div className="post-content">
                  {
                    post.frontmatter.featured && !relatedPosts ?
                      <figure className="media-left">
                        <Link className="post-thumbnail" to={post.fields.slug}>
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.featuredimage,
                              alt: `featured image thumbnail for post ${
                                post.title
                                }`,
                            }}
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
                    post.frontmatter.featured && !relatedPosts ?
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

export default props => (
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
    render={(data, count) => <BlogRoll relatedTags={props.tags} excludePostId={props.excludePostId} data={data} count={count} />}
  />
);