import React from 'react';
import { navigate } from 'gatsby-link';

import Layout from '../../components/Layout'
import PodcastSnippet from '../../components/PodcastSnippet';



function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}

export default class FrontEndPodcastPage extends React.Component {
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
                                The Front End podcast
                            </h1>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="content">
                            <p>In <a href="https://anchor.fm/the-front-end" target="__blank">The Front End podcast</a> I explore the in's and out's of life as a developer. We delve into challenging topics around modern-day development and technology
                            including learning and professional growth, programming languages, frameworks, tools, techniques, UX/UI, and careers.</p>
                            <p><img src="/img/TheFrontEndpodcastlogo.png" alt="The Front End Podcast logo" /></p>
                            <p>I've been a developer for almost 20 years and have spent the majority of that career at the forefront of the user's experience, building user interfaces. For all I'm a regular writer of tutorials and
                                articles on here and <a href="https://dev.to/kendalmintcode" target="__blank">the Dev platform</a>, I wanted to expand my creative outlets and bring a different type of content to my audience.</p>
                            <p>Also, as a coding mentor on the wonderful <a href="https://codingcoach.io" target="__blank">Coding Coach</a> platform, I find that there is growing number of budding developers out there who would like help, advice and support
                            on starting their career, asking questions and getting answers. A podcast seems like a great way to reach them with a little more warmth than the flat text of a blog aticle.</p>
                            <h2>What do you talk about on The Front End?</h2>
                            <p>Lots of things. We've got some special guests and a host of topics and ideas lined up, including:</p>
                            <ul>
                                <li>Unit and visual testing</li>
                                <li>Accessibility</li>
                                <li>CSS and preprocessors</li>
                                <li>Design systems, wireframing and UX</li>
                                <li>Getting hired as a developer</li>
                                <li>Productivity</li>
                                <li>Blogging and writing technical tutorials</li>
                                <li>Tools, tips and tricks</li>
                                <li>Problem solving and debugging</li>
                                <li>Development languages</li>
                                <li>Developer origin stories</li>
                                <li>JavaScript frameworks</li>
                                <li>Freelancing and starting your own business</li>
                                <li>Reddit-style AMA posts (ask me anything)</li>
                                <li>Discussions with a wealth of diverse guests</li>
                                <li>...and more</li>
                            </ul>

                            <h2>Where can I listen to the podcast?</h2>
                            <p>Glad you asked. I create all the episodes <a href="https://anchor.fm/the-front-end" target="__blank">using Anchor</a>, and that's probably the best place to start. Although the podcast is pushed out to all popular channels, such as Spotify and Apple Podcasts,
                            by visiting <a href="https://anchor.fm/the-front-end" target="__blank">The Front End's Anchor page</a>, you'll be able to find your preferred listening avenue.
                            </p>
                            <h2>Can I be featured in an episode?</h2>
                            <p>Of course you can, the more the merrier! Fill in the quick form below and I'll be in touch to arrange a chat.</p>
                            <p>If you'd like to know more about the show's format and what you'll be asked, you can read <a href="/the-front-end-podcast/podcast-faq">The Front End Podcast FAQ</a> where all the answers will be revealed.</p>
                            <PodcastSnippet />
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}