import React from 'react';
import PropTypes from 'prop-types'

import { DisqusLoader } from '../js/utils';


class CommentsSnippet extends React.Component {

    componentDidMount() {
        DisqusLoader(this.props.pageUrl, this.props.pageId);
    }

    render() {

        return (
            <section id="comments-area" className="comments-area section">
                <h2 className="comments-title subtitle is-size-5">Comments</h2>
                <div className="comments-inside">
                    <div id="disqus_thread"></div>
                </div>
                <div id="comments-overlay" className="comments-overlay">
                    <a href="#nogo" id="comments-show" className="comments-show">Show comments</a>
                </div>
                <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            </section>
        );
    }
};

CommentsSnippet.propTypes = {
    pageUrl: PropTypes.string,
    pageId: PropTypes.string,
}

export default CommentsSnippet;