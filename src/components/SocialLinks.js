import React from 'react';


const SocialLinks = props => {

    return (
        <p class="social-links">
            <a href="https://twitter.com/kendalmintcode" target="_blank" rel="noreferrer noopener">
                <span class="fab fa-twitter" aria-hidden="true"></span>
                <span class="screen-reader-text">Follow me on Twitter</span>
            </a>
            <a href="https://github.com/bpk68/" target="_blank" rel="noreferrer noopener">
                <span class="fab fa-github" aria-hidden="true"></span>
                <span class="screen-reader-text">Check out my code on GitHub</span>
            </a>
            <a href="https://codepen.io/robkendal/" target="_blank" rel="noreferrer noopener">
                <span class="fab fa-codepen" aria-hidden="true"></span>
                <span class="screen-reader-text">Have a peek at my Codepen</span>
            </a>
            <a href="https://robkendal.co.uk/rss/" target="_blank" rel="noreferrer noopener">
                <span class="fas fa-rss" aria-hidden="true"></span>
                <span class="screen-reader-text">Subscribe to my RSS feed</span>
            </a>
        </p>
    );
};

export default SocialLinks; 