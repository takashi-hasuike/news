(function (window) {
    'use strict';
    var settings = {
        perPage: 10
    };
    var api = {
        core: {}
    };
    var tags = {
        articles: []
    };

    api.core.showArticles = function (keyword) {
        tags.searchHeader[0].setKeyword(keyword);
        tags.searchHeader[0].show();
        api.core.removeArtiles();
        tags.keyword[0].hide();
        tags.searching[0].hide();
        tags.header[0].hide();
        tags.footer[0].hide();
    };
    api.core.showKeyword = function (keyword) {
        tags.searchHeader[0].hide();
        tags.searchHeader[0].hide();
        tags.paginate[0].hide();
        api.core.removeArtiles();
        tags.keyword[0].setKeyword(keyword);
        tags.keyword[0].setMessage('');
        tags.keyword[0].show();
        tags.searching[0].hide();
        tags.header[0].show();
        tags.footer[0].show();
    };
    api.core.removeArtiles = function () {
        if (tags.articles.length > 0) {
            for (var idx in tags.articles) {
                console.log(tags.articles[idx]);
                tags.articles[idx].unmount(false);
            }
            tags.articles = new Array();
        }
    };

    api.core.createSearchLink = function (keyword, page) {
        var link = 'search.html?s=' + encodeURIComponent(keyword);
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
        tags.searching[0].show();
        if (window.history && window.history.replaceState) {
            console.log("replace state");
            window.history.replaceState({}, '', api.core.createSearchLink(keyword, page));
        }
        setTimeout(function () {
            console.log("get artiles api");
            api.core.getArticles(queries);
        }, 500);
    };
    api.core.getArticles = function (queries) {
        var keyword = queries.s;
        var page = parseInt(queries.page || 1);
        newsApi.getArticles(queries, function (json, status, xhr) {
            console.log(json);
            tags.searching[0].hide();
            if (json.length === 0) {
                console.log("not found");
                if (page === 1) {
                    api.core.showKeyword(keyword);
                    tags.keyword[0].setMessage('NOT FOUND');
                }
            } else {
                var searchArticles = document.querySelector('section.search-articles');
                if (page > 1) {
                    var dividerTag = document.createElement('div');
                    dividerTag.classList.add('divider');
                    searchArticles.appendChild(dividerTag);
                }
                var articlesTag = document.createElement('articles');
                var articlesUniqueClass = 'articles-' + page;
                articlesTag.classList.add('columns-3');
                articlesTag.classList.add(articlesUniqueClass);
                articlesTag.classList.add('columnize-3');
                articlesTag.setAttribute('overflow', 'hidden');
                searchArticles.appendChild(articlesTag);
                var articles = riot.mount('.' + articlesUniqueClass, 'articles');
                tags.articles.push(articles[0]);

                for (var i = 0; i < json.length; ++i) {
                    articles[0].addArticle(json[i]);
                }
                if (settings.perPage === json.length) {
                    tags.paginate[0].active({
                        keyword: keyword,
                        page: page + 1
                    });
                }
            }
        }, function (status, xhr) {
            tags.searching[0].hide();
            console.log("error: " + status);
            console.log(xhr);
        });
    };

    riot.mount('raw');
    tags.searchHeader = riot.mount('search-header');
    tags.paginate = riot.mount('search-paginate');
    tags.keyword = riot.mount('search-keyword');
    tags.searching = riot.mount('searching');
    tags.header = riot.mount('logo-header');
    tags.footer = riot.mount('footer');
    riot.mount('site-menu');
    tags.searchHeader[0].on('show-keyword', function (keyword) {
        api.core.showKeyword(keyword);
    });
    tags.paginate[0].on('search-paging', function (options) {
        api.core.searchMoreArticles(options.keyword, options.page);
    });
    tags.keyword[0].on('search-articles', function (keyword) {
        api.core.searchArticles(keyword, 1);
    });

    var queries = newsApi.parseQueries(location.search);

    window.onload = function () {
        setTimeout(function () {
            console.log("showArticles");
            api.core.showArticles(queries.s);
            if (queries.s && queries.s.length > 0) {
                api.core.searchArticles(queries.s, queries.page || 1);
                console.log("show with queries");
            } else {
                api.core.showKeyword("");
                console.log("no queries");
            }
        }, 300);
    };

    window.onerror = function (e) {
        alert("Error caught:" + e.toString());
        console.log(e);
    };

}(window));
