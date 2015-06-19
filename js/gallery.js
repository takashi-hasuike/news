(function (window) {
    'use strict';
    var settings = {
        perPage: 10
    };
    var api = {
        core: {}
    };
    var tags = {
    };

    api.core.showArticles = function (keyword) {
        tags.searchHeader[0].setKeyword(keyword);
        tags.searchHeader[0].show();
//        api.core.removeArtiles();
//        tags.galleries[0].show();
//        tags.keyword[0].hide();
        tags.searching[0].hide();
//        tags.header[0].hide();
//        tags.footer[0].hide();
    };
//    api.core.showKeyword = function (keyword) {
//        tags.searchHeader[0].hide();
//        tags.searchHeader[0].hide();
//        tags.paginate[0].hide();
//        api.core.removeArtiles();
//        tags.keyword[0].setKeyword(keyword);
//        tags.keyword[0].setMessage('');
//        tags.keyword[0].show();
//        tags.searching[0].hide();
//        tags.header[0].show();
//        tags.footer[0].show();
//    };
//    api.core.removeArtiles = function () {
//        if (tags.articles.length > 0) {
//            for (var idx in tags.articles) {
//                console.log(tags.articles[idx]);
//                tags.articles[idx].unmount(false);
//            }
//            tags.articles = new Array();
//        }
//    };

    api.core.createSearchLink = function (keyword, page) {
        var link = 'gallery.html?s=' + encodeURIComponent(keyword);
        if (page) {
            link + '&page=' + encodeURIComponent(page);
        }
        return link;
    };

    api.core.searchArticles = function (keyword, page) {
        page || (page = 1);
        api.core.showArticles(keyword);
        api.core.searchMoreArticles(keyword, page);
    };
    api.core.searchMoreArticles = function (keyword, page) {
        queries = {
            s: keyword,
            page: page,
            per_page: settings.perPage
        };
//        tags.searching[0].show();
        if (window.history && window.history.replaceState) {
            console.log("replace state");
            window.history.replaceState({}, '', api.core.createSearchLink(keyword, page));
        }
        setTimeout(function () {
            console.log("get artiles api");
            api.core.getMedia(queries);
        }, 500);
    };
    api.core.getMedia = function (queries) {
        var keyword = queries.s;
        var page = parseInt(queries.page || 1);
        newsApi.getMedia(queries, function (json, status, xhr) {
            console.log(json);
            tags.searching[0].hide();
            if (json.length === 0) {
                if (page === 1) {
//                    api.core.showKeyword(keyword);
//                    tags.keyword[0].setMessage('NOT FOUND');
                }
            } else {

//                for (var i = 0; i < json.length; ++i) {
//                    tags.galleries[0].addArticle(json[i]);
//                }
//                if (settings.perPage === json.length) {
//                    tags.paginate[0].active(keyword, page + 1);
//                }
            }
        }, function (status, xhr) {
            tags.searching[0].hide();
            console.log("error: " + status);
            console.log(xhr);
        });
    };

    riot.mount('raw');
    tags.searchHeader = riot.mount('search-header', {api: api.core});
//    tags.galleries = riot.mount('galleries', {api: api.core});
    tags.paginate = riot.mount('search-paginate', {api: api.core});
//    tags.keyword = riot.mount('search-keyword', {api: api.core});
    tags.searching = riot.mount('searching');
//    tags.header = riot.mount('logo-header');
//    tags.footer = riot.mount('footer');
    riot.mount('site-menu');

    var queries = newsApi.parseQueries(location.search);

    window.onload = function () {
        setTimeout(function () {
            console.log("showArticles");
            api.core.showArticles(queries.s);
//            if (queries.s && queries.s.length > 0) {
                api.core.searchArticles(queries.s, queries.page || 1);
                console.log("show with queries");
//            } else {
//                api.core.showKeyword("");
//                console.log("no queries");
//            }
        }, 300);
    };

    window.onerror = function (e) {
        alert("Error caught:" + e.toString());
        console.log(e);
    };

}(window));
