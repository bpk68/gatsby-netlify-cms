import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import AboutSnippet from '../components/AboutSnippet';
import NewsletterSnippet from '../components/NewsletterSnippet';
import CommentsSnippet from '../components/CommentsSnippet';
import BlogRoll from '../components/BlogRoll';


export const BlogPostTemplate = ({
  postId,
  slug,
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">

            <article className="blog-article">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <p>{description}</p>
              <PostContent content={content} />

              <footer className="post-footer columns">
                <div className="column">
                  {tags && tags.length ? (
                    <p className="post-tags tags">
                      {
                        tags.map(tag => (
                          <Link
                            key={tag + `tag`}
                            to={`/tags/${kebabCase(tag)}/`}
                            className="tag is-white has-text-primary is-rounded">
                            #{tag}
                          </Link>
                        ))
                      }
                    </p>
                  ) : null}
                </div>

                <div className="column content is-small">
                  <p className="post-share">
                    <span className="post-share-title"><strong>Share: </strong></span>
                    <a target="_blank" href={`https://twitter.com/intent/tweet?text=${title}&amp;url=https://robkendal.co.uk${slug}`} rel="noopener noreferrer">Twitter</a>
                    <a target="_blank" href={`https://www.facebook.com/sharer.php?u=https://robkendal.co.uk${slug}`} rel="noopener noreferrer">Facebook</a>
                    <a target="_blank" href={`https://www.linkedin.com/shareArticle?mini=true&url=https://robkendal.co.uk${slug}&amp;title=${title}&amp;source="Kendal Mint Code"`} rel="noopener noreferrer">LinkedIn</a>
                  </p>
                </div>
              </footer>
            </article>

            <AboutSnippet />

            <CommentsSnippet
              pageUrl={slug}
              pageId={`ghost-${postId}`}
            />

            <NewsletterSnippet />

            <section className="section">
              <h2 className="comments-title subtitle is-size-5">Read more</h2>
              <BlogRoll tags={tags && tags.length ? tags : []} excludePostId={postId} />
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  const featureImageSrc = !!post.frontmatter.featuredimage && !!post.frontmatter.featuredimage.childImageSharp
    ? post.frontmatter.featuredimage.childImageSharp.fluid.src
    : post.frontmatter.featuredimage;

  return (
    <Layout>
      <BlogPostTemplate
        postId={post.id}
        slug={post.fields.slug}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        featuredImage={post.frontmatter.featuredimage}
        helmet={
          <Helmet titleTemplate="%s | Kendal Mint Code">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />

            <meta property="og:title" content={post.frontmatter.title} />
            <meta property="og:description" content={post.frontmatter.description} />
            <meta property="og:url" content={`https://robkendal.co.uk${post.fields.slug}`} />
            <meta property="og:image" content={`https://robkendal.co.uk${featureImageSrc}`} />

            <meta property="article:published_time" content="2019-04-01T08:41:19.000Z" />
            {/* <meta property="article:modified_time" content="2019-04-01T09:11:48.000Z" /> */}

            {post.frontmatter.tags.map(tag => (
              <meta key={tag + `tag`} property="article:tag" content={tag} />
            ))}

            <meta name="twitter:title" content={post.frontmatter.title} />
            <meta name="twitter:description" content={post.frontmatter.description} />
            <meta name="twitter:url" content={`https://robkendal.co.uk${post.fields.slug}`} />
            <meta name="twitter:image" content={`https://robkendal.co.uk${featureImageSrc}`} />

            <meta name="twitter:label2" content="Filed under" />
            <meta
              name="twitter:data2"
              content={
                post.frontmatter.tags.map(tag => (
                  `${tag},`
                )
                )
              }
            />

          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
        description
        featured
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 900, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
      }
    }
  }
`
