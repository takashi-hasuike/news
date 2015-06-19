//
//  news api client
//

(function (window) {
    window.newsApi || (window.newsApi = {});

    // setting for request url
    var settings = {
        baseUrl: "http://dev-news.dwango.jp/wp-json",
        //baseUrl: "http://localhost:8080/wordpress/wp-json",
        categories: {
            pickup: {val: 4, label: 'ピックアップ'},
            idol: {val: 2, label: 'アイドル'},
            jpop: {val: 5, label: 'J-POP'},
            anime: {val: 6, label: 'アニメ・声優'},
            niconico: {val: 7, label: 'ニコニコミュージック'}
        },
        getDefaultCategories: function () {
            var categories = settings.categories;
            return [categories.idol, categories.jpop, categories.anime, categories.niconico];
        },
        getCategoryValues: function (categories) {
            categories || (categories = settings.getDefaultCategories());
            var result = [];
            for (var i in categories) {
                category = categories[i];
                result.push(category.val);
            }
            return result;
        }
    };

    /**
     *  api query key info
     * @type type
     */
    var filterKeyMap = {
        s: 'filter[s]',
        keyword: 'filter[s]',
        name: 'filter[name]',
        cat: 'filter[cat]',
        'cat[]': 'filter[cat]',
        category: 'filter[cat]',
        order: 'filter[order]',
        order_by: 'filter[orderBy]',
        per_page: 'filter[posts_per_page]',
        posts_per_page: 'filter[posts_per_page]',
        page: 'page'
    };


    /**
     *
     * @param {number} id
     * @param {function} success
     * @param {function} error
     * @returns {news_api_client_L7.requestJson.xmlHttp|XMLHttpRequest}
     */
    function getArticle(id, success, error) {
        var url = settings.baseUrl + "/posts/" + id;
        var queries = {dummy: uuid()};
        return requestJson(url, queries, success, error);
    }

    /**
     *
     * @param {Hash} options
     * @param {function} success
     * @param {function} error
     * @returns {XMLHttpRequest|news_api_client_L7.requestJson.xmlHttp}
     */
    function getArticles(options, success, error) {
        var url = settings.baseUrl + "/posts";
        var defaultOptions = {
            // s: キーワード
            // name: 記事タイトル
            // cat: カテゴリ
            cat: settings.getCategoryValues(),
            order: 'DESC',
            order_by: 'date',
            posts_per_page: 20,
            page: 1,
            dummy: uuid()
        };

        var queries = createQuery(mergeOptions(defaultOptions, options));
        return requestJson(url, queries, success, error);
    }

    /**
     *
     * @param {type} options
     * @param {type} success
     * @param {type} error
     * @returns {XMLHttpRequest|buf.length.XMLHttpRequest|String.XMLHttpRequest|require.XMLHttpRequest|digits.length.XMLHttpRequest|j.XMLHttpRequest|Array.XMLHttpRequest|Math@call;floor.XMLHttpRequest|i.XMLHttpRequest|news_api_client_L5.requestJson.xmlHttp|news_api_client_L7.requestJson.xmlHttp}     *
     */
    function getMedia(options, success, error) {
        var url = settings.baseUrl + "/media";
        var defaultOptions = {
            // s: キーワード
            // cat: カテゴリ
            cat: settings.getCategoryValues(),
            order: 'DESC',
            order_by: 'date',
            posts_per_page: 20,
            page: 1,
            dummy: uuid()
        };

        var queries = createQuery(mergeOptions(defaultOptions, options));
        return requestJson(url, queries, success, error);
    }

    function createQuery(options) {
        var result = {};
        for (var key in options) {
            var filteredKey = filterKeyMap[key];
            if (filteredKey) {
                result[filteredKey] = options[key];
            } else {
                result[key] = options[key];
            }
        }
        return result;
    }

    /**
     *
     * @param {type} path
     * @param {type} queries
     * @param {type} success
     * @param {type} error
     * @returns {news_api_client_L7.requestJson.xmlHttp|XMLHttpRequest}
     */
    function requestJson(path, queries, success, error) {
        path || (path = '');

        var xmlHttp = new XMLHttpRequest();
        if (queries) {
            var queryString = buildQueries(queries);
            path = appendQuery(path, queryString);
        }

        console.log(path);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState !== 4) {
                return;
            }
            if (xmlHttp.status === 200) {
                var json = JSON.parse(xmlHttp.responseText);
                console.log("success request");
                success(json, xmlHttp.status, xmlHttp);
            } else {
                console.log("error request");
                error(xmlHttp.status, xmlHttp);
            }
        };
        xmlHttp.open("GET", path, true);
        xmlHttp.send();

        return xmlHttp;
    }

    function appendQuery(url, queryString) {
        if (!queryString) {
            return url;
        }
        url = url.replace(/[?&]$/, '');
        if (url.match(/\?/)) {
            url = url + '&' + queryString;
        } else {
            url = url + '?' + queryString;
        }

        return url;
    }

    function buildQueries(queries) {
        var ret = [];
        for (var key in queries) {
            ret.push(encodeURIComponent(key) + "=" + encodeURIComponent(queries[key]));
        }
        return ret.join("&");
    }

    function parseQueries(queryString) {
        var ret = {};
        if (!queryString) {
            return ret;
        }
        queryString = queryString.replace(/^\?/, '');

        var queries = queryString.split('&');
        for (var num in queries) {
            keyValue = queries[num].split('=');
            if (keyValue.length === 2) {
                var key = decodeURIComponent(keyValue[0]);
                var value = decodeURIComponent(keyValue[1]);
                if (key.match(/.*\[\]$/)) {
                    if (ret[key]) {
                        ret[key].push(value);
                    } else {
                        ret[key] = new Array(value);
                    }
                } else {
                    ret[key] = value;
                }
            }
        }
        console.log(ret);
        return ret;
    }

    function mergeOptions(target, options) {
        if (!target || !options) {
            return target;
        }
        for (var key in options) {
            var val = options[key];
            target[key] = val;
        }
        return target;
    }

    function uuid() {
        var uuid = "", i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }

    window.newsApi.settings = settings;
    window.newsApi.getArticle = getArticle;
    window.newsApi.getArticles = getArticles;
    window.newsApi.getMedia = getMedia;
    window.newsApi.parseQueries = parseQueries;
}(window));

