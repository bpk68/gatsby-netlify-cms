
const loadShowMore = disqusContent => {

    if (disqusContent !== null) {
        //console.log('this is working!');
        const interval = setInterval(function () {
            const disqusHeight = disqusContent.clientHeight;

            //console.log(disqusHeight);

            if (disqusHeight > 100) {
                console.log('its over 100px');
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


export const CommentsLoader = () => {

    let disqusContent = document.querySelector('#disqus_thread');

    //console.log('found something: ' + disqusContent);

    if (disqusContent !== null) {
        loadShowMore(disqusContent);
    } else {
        setTimeout(() => {
            disqusContent = document.querySelector('#disqus_thread');
            if (disqusContent !== null) {
                loadShowMore(disqusContent);
            }
        }, 1000);
    }
};

export const DisqusLoader = (url, identifier) => {
    // eslint-disable-next-line
    const disqus_config = function () {
        this.page.url = `https://robkendal.co.uk/${url}`;
        this.page.identifier = identifier;
    };
    (function () {
        var d = document, s = d.createElement('script');
        s.src = 'https://robkendal.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
};