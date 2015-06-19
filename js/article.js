(function (window) {
    'use strict'
    var tags = {};
    var articleSection = '.article-section';

    var queries = newsApi.parseQueries(location.search);
    riot.mount('raw');
    riot.mount('site-menu');
    riot.mount('footer');
    tags.articleContent = riot.mount('article-content');
    if (queries.id) {
        tags.loading = riot.mount('loading');
    } else {
        riot.mount('error', {error: 404});
        return;
    }

    function getArticle() {
        newsApi.getArticle(queries.id, function (json, status, xhr) {
            riot.mount('article-header', {data: json.main_image});
            tags.articleContent[0].on('item-updated', function () {
                var article = document.querySelector(articleSection);
                article.classList.add('show-article');
            });
            tags.articleContent[0].setItem(json);

            var images = json.child_images || [];
            if (images.length > 0) {
                riot.mount('article-gallery', {data: images});
            }
            var related = json.related_posts || [];
            if (related.length > 0) {
                riot.mount('article-related', {data: related});
            }
            tags.loading[0].fadeout();
        }, function (status, xhr) {
            if (status === 404) {
                location.href = '/';
                return;
            } else {
                riot.mount('error', {error: 500});
            }
            tags.loading[0].fadeout();
        });
    }

    window.onload = function () {
        setTimeout(function () {
            var isMobileSafari7 = !!navigator.userAgent.match(/i(Pad|Phone|Pod).+(Version\/7\.\d+ Mobile)/i);
            if (isMobileSafari7) {
                var element = document.querySelector(articleSection + " .left-triangle");
                element.style.borderLeft = '' + window.innerWidth + 'px solid white';
            }
            getArticle();
        }, 300);
    };

    window.onerror = function (e) {
        alert("Error caught:" + e.toString());
        console.log(e);
    };

}(window));
