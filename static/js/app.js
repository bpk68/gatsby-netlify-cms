
const CommentsLoader = () => {
    const disqusContent = document.querySelector('#disqus_thread');

    if (disqusContent !== null) {
        //console.log('this is working!');
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
};

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    CommentsLoader();
});
