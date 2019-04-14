import React from 'react';
import PropTypes from 'prop-types'


export const CommentsLoader = () => {
    const disqusContent = document.querySelector('#disqus_thread');

    if (disqusContent !== null) {
        const interval = setInterval(function () {
            const disqusHeight = disqusContent.clientHeight;
            if (disqusHeight > 100) {
                document.querySelector('#comments-area').classList.add('comments--loaded');
                clearInterval(interval);
            }
        }, 100);
        document.querySelector('#comments-overlay, #comments-show').addEventListener('click', (e) => {
            const commentsArea = document.querySelector('#comments-area');
            commentsArea.classList.remove('comments--loaded');
            commentsArea.classList.add('comments--opened');
            e.preventDefault();
        });
    }
}



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