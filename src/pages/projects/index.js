import React from 'react';
import { navigate } from 'gatsby-link';
import Helmet from 'react-helmet';
import PreviewCompatibleImage from '../../components/PreviewCompatibleImage';

import Layout from '../../components/Layout'

export default class FrontEndPodcastPage extends React.Component {
    render() {
        return (
            <Layout>
                <Helmet titleTemplate="%s | Kendal Mint Code">
                    <title>Discover more about the front end projects by Rob Kendal</title>
                    <meta
                        name="description"
                        content="I have a number of front end open source projects available on my GitHub account. Here are some of the most popular"
                    />
                </Helmet>
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
                                Projects and plans
                            </h1>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="content">
                            <p>
                                I have a few open source projects and repositories that I'm working on or have available on <a href="">my GitHub account</a>.
                                <br />
                                I've broken down a few of the more popular ones here. Check them out and feel free to fork, feedback, leave pull requests, or request features :D.
                            </p>

                            <hr />

                            <article className="blog-post media">
                                <figure className="media-left" style={{ width: '240px' }}>
                                    <a href="https://github.com/bpk68/g-sheets-api" className="post-thumbnail">
                                        <PreviewCompatibleImage
                                            imageInfo={{
                                                image: require('../../../static/img/g-sheets-logo.png'),
                                                alt: 'Google Sheets icon'
                                            }}
                                        />
                                    </a>
                                </figure>
                                <div className="media-content">
                                    <div className="post-meta">
                                        <p className="subtitle is-size-6 is-block is-uppercase has-text-grey-light">
                                            g-sheets-api
                                        </p>
                                        <h2 className="post-title title is-size-4">
                                            <a href="https://github.com/bpk68/g-sheets-api" title="read more about the project on GitHub">
                                                Google Sheets Reader
                                            </a>
                                        </h2>
                                    </div>
                                    <div className="post-content">
                                        <p>
                                            This tiny (but hopefully mighty) utility package helps fetch, read and process data from a Google Sheet without the faff of having to deal with the full-blown Google Sheets API
                                        </p>
                                        <p>
                                            <a href="https://github.com/bpk68/g-sheets-api">Find out more</a>
                                        </p>
                                    </div>
                                </div>
                            </article>


                            <hr />
                            <p>&nbsp;</p>

                            <article className="blog-post media">
                                <figure className="media-left" style={{ width: '240px' }}>
                                    <a href="https://github.com/bpk68/api-server-starter" className="post-thumbnail">
                                        <PreviewCompatibleImage
                                            imageInfo={{
                                                image: require('../../../static/img/nodejs-new-pantone-black.png'),
                                                alt: 'Node JS logo'
                                            }}
                                        />
                                    </a>
                                </figure>
                                <div className="media-content">
                                    <div className="post-meta">
                                        <p className="subtitle is-size-6 is-block is-uppercase has-text-grey-light">
                                            api-server-starter
                                        </p>
                                        <h2 className="post-title title is-size-4">
                                            <a href="https://github.com/bpk68/api-server-starter" title="">
                                                Node API Server Starter Kit
                                            </a>
                                        </h2>
                                    </div>
                                    <div className="post-content">
                                        <p>
                                            This popular starter kit (currently being used as part of the curriculum in a university course) contains everything you'll need to create your very own Node-based API server.
                                            It uses Express JS and is configured to serve JSON files for data.
                                        </p>
                                        <p>
                                            <a href="https://github.com/bpk68/api-server-starter">Find out more</a>
                                        </p>
                                    </div>
                                </div>
                            </article>

                            <hr />
                            <p>&nbsp;</p>

                            <article className="blog-post media">
                                <figure className="media-left" style={{ width: '240px' }}>
                                    <a href="https://github.com/bpk68/react-visual-query-builder" className="post-thumbnail">
                                        <PreviewCompatibleImage
                                            imageInfo={{
                                                image: require('../../../static/img/react-logo.png'),
                                                alt: 'Node JS logo'
                                            }}
                                        />
                                    </a>
                                </figure>
                                <div className="media-content">
                                    <div className="post-meta">
                                        <p className="subtitle is-size-6 is-block is-uppercase has-text-grey-light">
                                            react-visual-query-builder
                                        </p>
                                        <h2 className="post-title title is-size-4">
                                            <a href="https://github.com/bpk68/react-visual-query-builder" title="">
                                                React Visual Query Builder
                                            </a>
                                        </h2>
                                    </div>
                                    <div className="post-content">
                                        <p>
                                            Driven by a need for a more customised query builder tool built in React, I developed an open source query builder that will output a structured JSON query object comprised of rules,
                                            rule-groups and a number of field components depending on desired input type.
                                        </p>
                                        <p>
                                            <a href="https://github.com/bpk68/react-visual-query-builder">Find out more</a>
                                        </p>
                                    </div>
                                </div>
                            </article>

                            <hr />
                            <p>&nbsp;</p>

                            <article className="blog-post media">
                                <figure className="media-left" style={{ width: '240px' }}>
                                    <a href="https://github.com/bpk68/Family-Dog-Finder" className="post-thumbnail">
                                        <PreviewCompatibleImage
                                            imageInfo={{
                                                image: require('../../../static/img/ruff-guides-logo.png'),
                                                alt: 'Node JS logo'
                                            }}
                                        />
                                    </a>
                                </figure>
                                <div className="media-content">
                                    <div className="post-meta">
                                        <p className="subtitle is-size-6 is-block is-uppercase has-text-grey-light">
                                            Family-Dog-Finder (in progress)
                                        </p>
                                        <h2 className="post-title title is-size-4">
                                            <a href="https://github.com/bpk68/Family-Dog-Finder" title="">
                                                Ruff Guides: a family dog matcher
                                            </a>
                                        </h2>
                                    </div>
                                    <div className="post-content">
                                        <p>
                                            This one is a light-hearted attempt to match families with their perfect breed of dog. Simply answer a few questions and the matching engine
                                            will return a list of possible breeds that could work for your family.
                                        </p>
                                        <p>
                                            <a href="https://github.com/bpk68/Family-Dog-Finder">Find out more</a>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}