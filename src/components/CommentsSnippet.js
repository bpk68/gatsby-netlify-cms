import React from 'react';
import PropTypes from 'prop-types'

const CommentsSnippet = props => {

    const disqusHtml = `
        var disqus_config = function () {
        this.page.url = https://robkendal.co.uk/${props.pageUrl};
        this.page.identifier = ${props.pageId};
        };
        (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://robkendal.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();
    `;

    return (
        <>
            <section id="comments-area" className="comments-area">
                <h2 className="comments-title subtitle is-size-5">Comments</h2>
                <div className="comments-inside">
                    <div id="disqus_thread"></div>
                </div>
                <div id="comments-overlay" className="comments-overlay">
                    <a href="#nogo" id="comments-show" className="comments-show">Show comments</a>
                </div>
                <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            </section>

            <script dangerouslySetInnerHTML={{ __html: disqusHtml }}></script>
        </>
    );
};

CommentsSnippet.propTypes = {
    pageUrl: PropTypes.string,
    pageId: PropTypes.string,
}

export default CommentsSnippet;