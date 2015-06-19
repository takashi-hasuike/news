(function (window) {
    'use strict';
    var tags = {};

    riot.mount('raw');
    riot.mount('site-menu');
    tags.loading = riot.mount('loading');
    tags.articles = riot.mount('articles');
    tags.header = riot.mount('logo-header');
    tags.footer = riot.mount('footer');
    console.log('mount finish');

    // pickup articles
    function getPickupArticles() {
        console.log('get pickup articles');
        newsApi.getArticles({
            cat: newsApi.settings.categories.pickup.val,
            order_by: 'meta_value_num',
            meta_key: 'pickup_sort'
        }, function (json, status, xhr) {
            tags.pickup = riot.mount('pickup', {data: json});
            tags.loading[0].fadeout();
        }, function (status, xhr) {
            console.log("error: " + status);
            tags.loading[0].fadeout();
        });
    }
    // top page list articles
    function getTopPageArticles() {
        console.log('get articles');
        newsApi.getArticles(null, function (json, status, xhr) {
            if (json.length > 0) {
                riot.mount('articles-first', {data: json[0]});
            }
            if (json.length > 1) {
                for (var i = 1; i < json.length; ++i) {
                    tags.articles[0].addArticle(json[i]);
                }
            }
            tags.footer[0].show();
        }, function (status, xhr) {
            console.log("error: " + status);
        });
    }

    window.onload = function () {
        setTimeout(function () {
            getPickupArticles();
            getTopPageArticles();
        }, 300);
    };

    window.onerror = function (e) {
        alert("Error caught:" + e.toString());
        console.log(e);
    };
}(window));
