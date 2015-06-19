riot.tag('article-content', ' <time class="grey publish-date">{ item.show_date }</time><h2 class="paragraph"><raw class="column-2"></raw></h2><div class="content">  <div class="addthis_sharing_toolbox"></div><raw style="display:block"></raw></div>', 'article-content h2, article-content h3, article-content h4, article-content h5, article-content h6, article-content .content ul, article-content .content li { -moz-column-span: all; -webkit-column-span: all; column-span: all; } article-content h2 { font-size: 1.5em; line-height: 1.5em; font-weight: bold; } article-content h3 { font-size: 1.2em; line-height: 1.2em; font-weight: bold; } article-content h4 { font-size: 1.2em; line-height: 1.2em; font-weight: bold; } article-content h5 { font-size: 1.2em; line-height: 1.2em; font-weight: bold; } article-content h6 { font-size: 1em; line-height: 1em; font-weight: bold; } article-content img { max-width:100%; max-height:100%; width: 100%; height: 100%; } article-content time { position: absolute; margin-top: -40px; font-size: medium; } article-content div.addthis_sharing_toolbox { margin-bottom: 1.618033988749894em; } article-content .content { font-size: medium; column-count: auto; column-width: 220px; -webkit-column-count: auto; -webkit-column-width: 220px; -moz-column-count: auto; -moz-column-width: 220px; column-rule: 1px dotted #777; -webkit-column-rule: 1px dotted #777; -moz-column-rule: 1px dotted #777; column-gap: 2em; -webkit-column-gap: 2em; -moz-column-gap: 2em; } article-content .content p img { padding-top: 1px; /* chromeでcolumns指定のとき、画像最上部が分割されてしまうバグの対応 */ } article-content .content a { text-decoration: underline; color: #009dbf; }', function(opts) {var _this = this;

var self = this;
Object.assign(self, {
    init: function init(opts) {
        this.item = {};
    },
    setItem: function setItem(item) {
        this.item = item;
        this.itemUpdated = true;
        this.tags.raw[0].setContent(item.title);
        this.tags.raw[1].setContent(item.content);
        this.update();
    }
});
self.on("mount", function () {
    var script = document.createElement("script");
    script.src = "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-555ea643545b5705";
    script.async = "async";
    document.body.appendChild(script);
});
self.on("updated", function () {
    if (_this.itemUpdated) {
        self.trigger("item-updated");
    }
});

this.init(opts);
});

riot.tag('article-gallery', ' <h3 class="paragraph grey">GALLERY<br ><span class="small">写真集</span></h3><div class="gallery"><figure class="wh300 first"><article-gallery-item if="{ firstImage }" data="{ firstImage }" ></article-gallery-item></figure><figure class="{secondImagesClass} second"><article-gallery-item each="{ item, i in secondImages }" data="{ item }" ></article-gallery-item></figure></div>', 'article-gallery div.gallery { border: none; margin: 0; padding: 0; display: table; width: 100%; height: 210px; } article-gallery figure { display: table-cell; height: 210px; vertical-align: top; margin: 0; width: 50%; } article-gallery .gallery a { text-decoration: none; line-height:none; display: block; margin-bottom: 5px; } article-gallery .second a { padding-left: 5px; } article-gallery figure img { border:none; margin: 0; vertical-align: bottom; line-height: 0; max-width:100%; max-height:100%; } article-gallery h3 { font-size: 1.2em; line-height: 1.2em; font-weight: bold; } article-gallery figure.wh300 article-gallery-item, article-gallery figure.wh300 article-gallery-item img { width:100%; height:205px; } article-gallery figure.wh150 article-gallery-item, article-gallery figure.wh150 article-gallery-item img { width:100%; height:100px; } article-gallery figure.wh100 article-gallery-item, article-gallery figure.wh100 article-gallery-item img { width:100%; height:65px; }', function(opts) {
        var self = this;
        var whClasses = [ "wh300", "wh150", "wh100" ];

        self.images = opts.data || [];
        self.firstImage = self.images[0];
        self.secondImages = self.images.slice(1, 4);
        if (self.images.length === 0) {
            return;
        }
        self.secondImagesClass = whClasses[Math.max(0, self.secondImages.length - 1) % 3];

        self.on('mount', function () {

        });
    
});

riot.tag('article-gallery-item', ' <a href="{ item.large.url }"><img src="images/1x1.gif" riot-style="background-image:url({ item.medium.url });"></a>', function(opts) {
var self = this;
self.item = opts.data;
});

riot.tag('article-header', ' <header class="first white" overflow="hidden" riot-style="background-image:url({ image.large.url })"></header>', 'article-header header { } article-header header > h1 { font-family: Monofett; font-size: 28px; font-weight: normal; } article-header .first { height: 480px; opacity: 0; } article-header .first .blind { box-shadow: inset 0 -8em 12em rgba(0, 0, 0, 1); -moz-box-shadow: inset 0 -8em 12em rgba(0, 0, 0, 1); -webkit-box-shadow: inset 0 -8em 12em rgba(0, 0, 0, 1); } article-header .fadein { opacity: 1; transition-duration: 3s; -webkit-transition-duration: 3s; -moz-transition-duration: 3s; }', function(opts) {
var self = this;
self.image = opts.data;
self.on("mount", function () {
    var header = self.root.querySelector("header");
    header.classList.add("fadein");
});
});



riot.tag('article-related', ' <h3 class="paragraph grey">RELATED POSTS<br ><span class="small">関連記事</span></h3><div class="related-posts"><div class="wh300"><article-related-post data="{ firstItem }"></article-related-post></div><div class="{secondItemsClass}"><article-related-post each="{ item, i in secondItems }" data="{ item }"></article-related-post></div></div>', 'article-related h3 { font-size: 1.2em; line-height: 1.2em; font-weight: bold; } article-related .related-posts { border: none; margin: 0; padding: 0; display: table; width: 100%; height: 210px; } article-related .related-posts > div { display: table-cell; height: 210px; vertical-align: top; margin: 0; width: 50%; padding-left: 5px; } article-related-post { display: block; width: 100%; margin: 0; margin-top: 5px; } article-related .wh300 article-related-post, article-related .wh300 article-related-post img, article-related .wh300 article-related-post .cover { width:100%; height:205px; } article-related .wh150 article-related-post, article-related .wh150 article-related-post img, article-related .wh150 article-related-post .cover { width:100%; height:100px; } article-related .wh100 article-related-post, article-related .wh100 article-related-post img, article-related .wh100 article-related-post .cover { width:100%; height:65px; } article-related-post .cover { display: block; position: absolute; left: 0; top: 0; right: 0; bottom: 0; width: 100%; margin: auto; background-color: rgba(0, 0, 0, .5); opacity: 1; } article-related-post a { width: 100%; height: 100%; display: block; } article-related-post img { min-width: 100%; max-width: 100%; vertical-align: bottom; } article-related-post .detail { display: table; position: absolute; left: 0; top: 0; right: 0; bottom: 0; width: 90%; height: auto; margin: auto; } article-related-post hr { margin:0px; padding: 0px; border-bottom: 1px white solid; }', function(opts) {
        var self = this;
        var whClasses = [ "wh300", "wh150", "wh100" ];

        self.items = opts.data || [];
        self.firstItem = self.items[0];
        self.secondItems = self.items.slice(1, 4);
        if (self.items.length === 0) {
            return;
        }
        self.secondItemsClass = whClasses[Math.max(0, self.secondItems.length - 1) % 3];

    
});


riot.tag('article-related-post', '<div class="related-post"><a href="article.html?id={ item.ID }"><img src="images/1x1.gif" riot-style="background-image:url({ item.main_image.medium.url })"><div class="cover"></div><div class="detail white"><div class="date small">{ item.show_date }</div><hr ><div class="title bold small"><raw content="{ item.title }"></raw></div></div></a></div>', function(opts) {
var self = this;
self.item = opts.data;
});

riot.tag('articles-first', ' <a href="article.html?id={item.ID}" style="display:block;"><article class="collapse fix split-7 emboss white-background lampblack"><div class="span-3 tall" riot-style="background-image:url({ item.main_image.medium.url });"></div><div class="span-4 tall whiteness"><div class="triangle"></div><div class="article-info"><h5><raw content="{ item.title }"></raw></h5><time class="grey small"><raw content="{ item.show_date }"></time></div></div></article><div class="shadow"></div></a>', 'articles-first article { height: 160px; padding: 0; border-radius: .2em; overflow: hidden; } articles-first .tall { padding: 0; margin: 0; height: 100%; } articles-first .shadow { position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0em -2em 4em rgba(255, 255, 255, .3); -moz-box-shadow: inset 0em -2em 4em rgba(255, 255, 255, .3); -webkit-box-shadow: inset 0em -2em 4em rgba(255, 255, 255, .3); } articles-first .triangle { border-top: 0 solid transparent; border-left: 2em solid transparent; border-right: 0 solid transparent; border-bottom: #fff 160px solid; height: 0px; float: left; margin-left: -2em; width: 0px; } articles-first .article-info { margin: 1em; }', function(opts) {
var self = this;
self.item = opts.data;
});

riot.tag('articles', ' <ul><li each="{ item, i in items }" class="article-block" ><article if="{ item.type != \'ad\' }" style="display:block"><nav class="paragraph"><div class="category whiteness ironblue-background bold small"><a href="search.html?s={ item.category_name }"><raw content="{ item.category_name }"></raw></a></div></nav><h5><a href="article.html?id={ item.ID }"><raw class="justify" content="{ item.title }"></raw></a></h5><time class="grey small">{ item.show_date }</time><p class="bold slategrey small"><a href="article.html?id={ item.ID }"><raw content="{ item.excerpt }"></raw></a></p><a href="article.html?id={ item.ID }"><img riot-src="{ (item.main_image && item.main_image.medium.url) || \'\' }"></a></article><article class="ad" if="{ item.type === \'ad\' }"><nav class="paragraph"><div class="category whiteness grassgreen-background bold small">広告</div></nav><ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-9763668624737759" data-ad-slot="5565372028"></ins></article></li></ul>', 'articles { display: block; /*overflow: hidden;*/ } articles.hide { display:none; } articles ul { display: block; } articles article h1, articles article h2, articles article h3, articles article h4, articles article h5 { column-span: 1; -webkit-column-span: 1; -moz-column-span: 1; } articles li.article-block { display: block; margin-bottom: 10px; /* break-inside: avoid; -moz-break-inside: avoid; -webkit-column-break-inside: avoid;*/ } articles article .category { } articles article nav { max-width: 150px; } articles article nav div { border-radius: .2em; text-align: center; /*overflow: hidden;*/ } articles article > a, articles article p > a { display: block; } articles article nav, articles article a img, articles article ins { padding-top:1px; }', function(opts) {
var self = this;
self.items = [];

Object.assign(self, {
    show: function show() {
        this.root.classList.remove("hide");
    },
    hide: function hide() {
        this.root.classList.add("hide");
    },
    addArticle: function addArticle(article) {
        if (this.items.length % 5 == 4) {
            this.items.push({ type: "ad" });
            this.one("update", function () {
                (adsbygoogle = window.adsbygoogle || []).push({});
            });
        }
        this.items.push(article);
        this.update();
    },
    clearArticles: function clearArticles() {
        this.items.length = 0;
        this.update();
    }
});
});


riot.tag('error', ' <div class="error"><error-404 if="{ error === 404 }"></error-404><error-500 if="{ error === 500 }"></error-500></div>', 'error { position: relative; width: 100%; font-size: 1.2em; color:gray; } error .error { margin-top:100px; margin-bottom:200px; }', function(opts) {
var self = this;
self.error = opts.error;
});

riot.tag('error-404', '<p>ERROR</p><p>大変申し訳ございません。</p><p>お探しのページは存在しないか、移動あるいはサービス終了、削除された可能性がございます。</p><p>一度｢<a href="/">トップページ</a>｣からご希望のページをお探しいただきます様よろしくお願いいたします。</p>', function(opts) {


});

riot.tag('error-500', '<p>ERROR</p><p>大変申し訳ございません。</p><p>お探しのページは存在しないか、移動あるいはサービス終了、削除された可能性がございます。</p><p>一度｢<a href="/">トップページ</a>｣からご希望のページをお探しいただきます様よろしくお願いいたします。</p>', function(opts) {

});

riot.tag('footer', ' <div class="lampblack-background whiteness"><h5 align="center" class="press"><a href="/">&copy;2015 dwango.jp</a></h5></div>', 'footer { height: 60px; position: absolute; bottom: 0; width: 100%; } footer.hide { display: none; } footer > div { display: table; overflow: hidden; width: 100%; height: 100%; } footer h5 { display: table-cell; vertical-align: middle; }', function(opts) {
var self = this;

Object.assign(self, {
    show: function show() {
        this.root.classList.remove("hide");
    },
    hide: function hide() {
        this.root.classList.add("hide");
    }
});
});

riot.tag('galleries', ' <ul><li each="{ item, i in items }" class="round article-block"><article if="{ item.type != \'ad\' }" style="display:block"><a href="article.html?id={ item.ID }"><img riot-src="{ item.main_image.medium.url }"></a></article><article class="ad" if="{ item.type === \'ad\' }"><ins class="adsbygoogle" style="display:inline-block;width:50px;height:50px" data-ad-client="ca-pub-9763668624737759" data-ad-slot="5565372028"></ins></article></li></ul>', 'galleries { display: block; } galleries.hide { display:none; } galleries li.article-block { position: absolute; display: block; min-width: 50px; overflow: hidden; box-sizing: border-box; padding: 10px; transition-property: transform; transition-duration: .5s; -webkit-transition-property: transform; -webkit-transition-duration: .5s; } galleries li * { box-sizing: border-box; } galleries article { } galleries article a { display:block; text-align: center; } galleries article img { width: 100%; vertical-align: bottom; }', function(opts) {
var self = this;
self.items = [];

Object.assign(self, {
    show: function show() {
        this.root.classList.remove("hide");
    },
    hide: function hide() {
        this.root.classList.add("hide");
    },
    addArticle: function addArticle(article) {
        var itemWidth = parseInt(this.root.clientWidth / 3);
        if (this.items.length % 5 == 4) {
            this.items.push({ type: "ad" });
            this.one("update", function () {
                (adsbygoogle = window.adsbygoogle || []).push({});
            });
        }
        this.items.push(article);
        this.update();
    },
    clearArticles: function clearArticles() {
        this.items.length = 0;
        this.update();
    }
});
});


riot.tag('galleries_1', ' <ul><li each="{ item, i in items }" class="round article-block"><article if="{ item.type != \'ad\' }" style="display:block"><a href="article.html?id={ item.ID }"><img riot-src="{ item.main_image.medium.url }"></a></article><article class="ad" if="{ item.type === \'ad\' }"><ins class="adsbygoogle" style="display:inline-block;width:50px;height:50px" data-ad-client="ca-pub-9763668624737759" data-ad-slot="5565372028"></ins></article></li></ul>', 'galleries_1 { width: 100%; display: block; } galleries_1.hide { display:none; } galleries_1 li.article-block { position: absolute; display: block; min-width: 50px; overflow: hidden; box-sizing: border-box; padding: 10px; transition-property: transform; transition-duration: .5s; -webkit-transition-property: transform; -webkit-transition-duration: .5s; } galleries_1 li * { box-sizing: border-box; } galleries_1 article { } galleries_1 article a { display:block; text-align: center; } galleries_1 article img { width: 100%; vertical-align: bottom; }', function(opts) {var _this = this;

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var self = this;
self.items = [];

Object.assign(self, {
    show: function show() {
        this.root.classList.remove("hide");
    },
    hide: function hide() {
        this.root.classList.add("hide");
    },
    addArticle: function addArticle(article) {
        var itemWidth = parseInt(this.root.clientWidth / 3);
        if (this.items.length % 5 == 4) {
            this.items.push({ type: "ad" });
            this.one("update", function () {
                (adsbygoogle = window.adsbygoogle || []).push({});
            });
        }
        this.items.push(article);
        this.update();
    },
    clearArticles: function clearArticles() {
        this.items.length = 0;
        this.update();
    },
    updateFloater: function updateFloater() {
        this.floater.update();
    }
});

var ResizeListener = (function () {
    function ResizeListener() {
        _classCallCheck(this, ResizeListener);

        this.resizeTimer = null;
        this.interval = 600;
    }

    _createClass(ResizeListener, {
        mount: {
            value: function mount(callback) {
                this.callback = callback;
                this.stop();
                this.currentListener = this.onResize.bind(this);
                window.addEventListener("resize", this.currentListener, false);
            }
        },
        unmount: {
            value: function unmount() {
                this.stop();
                if (this.currentListener) {
                    window.removeEventListener("resize", this.currentListener);
                    this.currentListener = null;
                }
            }
        },
        stop: {
            value: function stop() {
                if (this.resizeTimer) {
                    clearTimeout(this.resizeTimer);
                    this.resizeTimer = null;
                }
            }
        },
        onResize: {
            value: function onResize(e) {
                var _this2 = this;

                this.stop();
                this.resizeTimer = setTimeout(function () {
                    _this2.callback(e);
                }, this.interval);
            }
        }
    });

    return ResizeListener;
})();

var GalleryFloater = (function () {
    function GalleryFloater(selector, parent, columns, minWidth) {
        _classCallCheck(this, GalleryFloater);

        this.isReady = false;
        this.items = [];
        this.lastItems = [];
        this.selector = selector;
        this.parent = parent;
        this.maxColumns = 3;
        this.minWidth = minWidth || 150;
        new ResizeListener().mount(this.onResize.bind(this));
    }

    _createClass(GalleryFloater, {
        onResize: {
            value: function onResize(e) {
                console.log("onResize");
                this.isReady = false;
                this.rectItems = [];
                this.lastItems = {};
                this.updateItems(true);
            }
        },
        update: {
            value: function update() {
                console.log("floater update");
                this.updateItems();
            }
        },
        updateItems: {
            value: function updateItems(force) {
                var targets = document.querySelectorAll(this.selector);
                this.recalcItemWidth();
                for (var i = 0; i < targets.length; ++i) {
                    var target = targets[i];
                    if (!force && target.classList.contains("floated")) {
                        continue;
                    }
                    var itemInfo = {
                        top: 0 };
                    if (i < this.columns) {
                        itemInfo.col = i;
                        itemInfo.left = i % this.columns * this.itemWidth;
                    } else {
                        for (var col in this.lastItems) {
                            var prevItem = this.lastItems[col];
                            var nextTop = parseInt(prevItem.top) + prevItem.dom.clientHeight;
                            console.log("top:" + itemInfo.top + " next:" + nextTop + " t:" + col);
                            if (itemInfo.top === 0 || itemInfo.top > nextTop) {
                                itemInfo.top = nextTop;
                                itemInfo.left = prevItem.left;
                                itemInfo.col = col;
                            }
                        }
                        console.log("top:" + itemInfo.top + " left: " + itemInfo.left);
                    }
                    target.classList.add("floated");
                    target.style.left = "0";
                    target.style.top = "0";
                    target.style.width = "" + this.itemPer + "%";
                    target.style.maxWidth = "" + this.itemPer + "%";

                    target.style.transform = "translate(" + itemInfo.left + "px, " + itemInfo.top + "px)";
                    target.style.webkitTransform = "translate(" + itemInfo.left + "px, " + itemInfo.top + "px)";
                    itemInfo.dom = target;
                    this.items[i] = itemInfo;
                    this.lastItems[itemInfo.col] = itemInfo;
                }
            }
        },
        recalcItemWidth: {
            value: function recalcItemWidth() {
                if (this.isReady) {
                    return;
                }
                this.isReady = true;
                this.width = this.parent.clientWidth;
                if (this.width > this.minWidth) {
                    this.columns = 3;
                } else {
                    this.columns = 1;
                }
                this.itemPer = Math.floor(100 / this.columns);
                this.itemWidth = Math.floor(this.width / this.columns);
            }
        }
    });

    return GalleryFloater;
})();

self.on("mount", function () {
    self.floater = new GalleryFloater("galleries_1 ul li", _this.root);
});
});


riot.tag('loading', ' <div class="loader">  <div class="ashgrey-background"></div></div>', 'loading { position: absolute; display:table; top: 0; left: 0; width: 100%; height: 100%; background-color:white; } loading .loader { display: table-cell; vertical-align: middle; width: 100%; height: 100%; } loading .loader > div { margin: 0 auto; border-radius: 50%; height: 30px; width: 30px; animation: load-ticker 1s infinite ease-in-out; -webkit-animation: load-ticker 1s infinite ease-in-out; -moz-animation: load-ticker 1s infinite ease-in-out; } @keyframes load-ticker { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1); opacity: 0; } } @-webkit-keyframes load-ticker { 0% { -webkit-transform: scale(0); opacity: 1; } 100% { -webkit-transform: scale(1); opacity: 0; } } @-moz-keyframes load-ticker { 0% { -moz-transform: scale(0); opacity: 1; } 100% { -moz-transform: scale(1); opacity: 0; } } loading.fadeout { opacity: 0; transition-duration: .3s; }', function(opts) {
var self = this;
Object.assign(self, {
    fadeout: function fadeout() {
        var _this = this;

        this.root.className = "fadeout";
        setTimeout(function () {
            _this.root.parentNode.removeChild(self.root);
        }, 500);
    }
});
});

riot.tag('logo-header', ' <div class="absolute margin white"><h1><a href="/">DWANGO.JP NEWS</a></h1></div>', 'logo-header { z-index: 10; position: absolute; margin-left: 1em; margin-top: 1em; } logo-header.hide { display: none; } logo-header h1 { z-index: 1; font-family: Monofett; font-size: 28px; font-weight: normal; }', function(opts) {
var self = this;

Object.assign(self, {
    show: function show() {
        self.root.classList.remove("hide");
    },
    hide: function hide() {
        self.root.classList.add("hide");
    }
});
});

riot.tag('pickup', ' <section class="pickup-section collapse split-7" overflow="visible"><article class="first span-5" riot-style="background-image:url({ item.main_image.large.url});"><a class="fill-link" href="article.html?id={ item.ID }"><div class="pickup-title"><h5 class="luster white"><raw content="{ item.title }"></raw></h5><time class="luster skygrey small">{ item.show_date }</time></div></a></article><nav class="second span-2"><div class="subitem" each="{ subitem, i in subitems }" riot-style="background-image:url({ subitem.main_image.medium.url });height:{ parent.subitemHeight }px;"><a class="fill-link" href="article.html?id={ subitem.ID }"></a></div></nav></section>', 'pickup .first { height: 480px; box-shadow: inset 0 -8em 12em rgba(0, 0, 0, 1); -moz-box-shadow: inset 0 -8em 12em rgba(0, 0, 0, 1); -webkit-box-shadow: inset 0 -8em 12em rgba(0, 0, 0, 1); } pickup .second { height: 480px; } pickup .pickup-title { position: absolute; bottom: 0; width: 100%; padding: 1em; } pickup > section { opacity: 0; } pickup section.pickup-section { overflow: visible; } pickup.fadeout > section { opacity: 0; transition-duration: .2s; -webkit-transition-duration: .2s; -moz-transition-duration: .2s; } pickup.fadein > section { height: 480px; opacity: 1; transition-duration: .2s; -webkit-transition-duration: .2s; -moz-transition-duration: .2s; } pickup article { padding: 0; } pickup .fill-link { position: absolute; display: block; width: 100%; height: 480px; } pickup nav { display: block; position: relative; } pickup nav .subitem { position:relative; width: 100%; }', function(opts) {
var self = this;
Object.assign(self, {
    fadein: function fadein() {
        this.root.classList.remove("fadeout");
        this.root.classList.add("fadein");
    },
    fadeout: function fadeout() {
        this.root.classList.remove("fadein");
        this.root.classList.add("fadeout");
    },
    setShowItems: function setShowItems(items) {
        this.items = items;
        if (items.length > 0) {
            this.item = items[0];
        }
        if (items.length > 1) {
            this.subitemHeight = 480 / (this.items.length - 1);
            var subitems = new Array();
            for (var i = 1; i < items.length; ++i) {
                var item = items[i];
                subitems.push(item);
            }
            this.subitems = subitems;
        }
    }
});
self.setShowItems(opts.data);

self.on("mount", function () {
    setTimeout(function () {
        self.fadein();
    }, 100);
});
});

riot.tag('raw', '', function(opts) {
Object.assign(this, {
    init: function init(opts) {
        if (opts.content) {
            this.root.innerHTML = opts.content;
        }
    },
    setContent: function setContent(content) {
        this.root.innerHTML = content;
    }
});
this.init(opts);
});
riot.tag('search-header', ' <div class="whiteness lampblack-background" style="position:relative;width:100%;height:100px;"><div class="keyword">{ keyword }</div><div class="edit-keyword" onclick="{ showKeyword }">＜</div></div>', 'search-header { display: block; position: relative; width: 100%; } search-header.hide .header * { display: none; } search-header .keyword { position: absolute; top: 50%; width: 100%; text-align: center; margin-top: -0.5em; } search-header .edit-keyword { position: absolute; font-size: 1.5em; top: 50%; left: 1em; margin-top: -0.75em; }', function(opts) {
var self = this;

Object.assign(self, {
    hide: function hide() {
        this.root.classList.add("hide");
    },
    show: function show() {
        this.root.classList.remove("hide");
    },
    showKeyword: function showKeyword() {
        this.trigger("show-keyword", this.keyword);
    },
    setKeyword: function setKeyword(keyword) {
        this.keyword = keyword;
        this.update();
    }
});
});

riot.tag('search-keyword', ' <div class="wrap" ><div class="message grey">{ message }</div><div style="display:inline-block;"><input type="text" name="s" value="{ keyword }" placeholder="検索ワードを指定してください" autofocus onchange="{ onChange }"></div></div>', 'search-keyword { position:absolute; background-color: black; display: table; margin: 0; padding: 0; height: 100%; min-height: 100%; width: 100%; overflow: hidden; top: 0; left: 0; transform: translateX(-150%); -webkit-transform: translateX(-150%); -moz-transform: translateX(-150%); } search-keyword.show { transform: translateX(0%); transition-property: transform; -webkit-transform: translateX(0%); -webkit-transition-property: -webkit-transform; -moz-transform: translateX(0%); -moz-transition-property: -moz-transform; transition-duration: .5s; -webkit-transition-duration: .5s; -moz-transition-duration: .5s; } search-keyword.hide { transform: translateX(-150%); transition-property: transform; -webkit-transform: translateX(-150%); -webkit-transition-property: -webkit-transform; -moz-transform: translateX(-150%); -moz-transition-property: -moz-transform; transition-duration: .5s; -webkit-transition-duration: .5s; -moz-transition-duration: .5s; } search-keyword .wrap { height: 100%; min-height: 100%; display: table-cell; vertical-align: middle; text-align: center; } search-keyword.show input { width: 300px; } search-keyword.hide input { display:none; } search-keyword .message { font-size: 1.2em; }', function(opts) {
var self = this;

Object.assign(self, {
    setKeyword: function setKeyword(keyword) {
        this.keyword = keyword;
        this.update();
    },
    setMessage: function setMessage(message) {
        this.message = message;
        this.update();
    },
    hide: function hide() {
        var input = self.root.querySelector("input");
        input.autocomplete = "off";
        input.blur();
        this.root.classList.remove("show");
        this.root.classList.add("hide");
    },
    show: function show() {
        var input = self.root.querySelector("input");
        input.autocomplete = "on";
        input.focus();
        this.root.classList.remove("hide");
        this.root.classList.add("show");
    },
    onChange: function onChange(e) {
        var keyword = e.target.value;
        if (keyword && keyword.length > 0) {
            this.trigger("search-articles", keyword);
        }
    }
});
});

riot.tag('search-paginate', ' <div class="paginate"></div>', 'search-paginate.hide { display: none; } search-paginate .paginate { width: 100%; height: 10px; }', function(opts) {var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var self = this;
self.items = [];

var ScrollShowListener = (function () {
    function ScrollShowListener(scrollParent) {
        _classCallCheck(this, ScrollShowListener);

        this._listener = null;
    }

    _createClass(ScrollShowListener, {
        setScrollTarget: {
            value: function setScrollTarget(scrollTarget, listener) {
                this._scrollTarget = scrollTarget;
                this.removeCurrentListener();
                this._listener = listener;
                this._wrapListener = this.checkScrollEventListener.bind(this);
                window.addEventListener("scroll", this._wrapListener, false);
            }
        },
        removeCurrentListener: {
            value: function removeCurrentListener() {
                if (!this._wrapListener) {
                    return;
                }
                window.removeEventListener("scroll", this._wrapListener, false);
                this._wrapListener = null;
                this._listener = null;
            }
        },
        checkScrollEventListener: {
            value: function checkScrollEventListener(e) {
                console.log(e);
                if (!this._scrollTarget) {
                    return;
                }
                var windowHeight = window.innerHeight || document.documentElement.clientHeight || 0;
                console.log("window height: " + windowHeight);
                var targetRect = this._scrollTarget.getBoundingClientRect();
                console.log("target rect top: " + targetRect.top);
                if (windowHeight >= targetRect.top) {
                    this._listener();
                    this.removeCurrentListener();
                }
            }
        }
    });

    return ScrollShowListener;
})();

self.scrollEventListener = new ScrollShowListener();

Object.assign(self, {
    hide: function hide() {
        this.root.classList.add("hide");
    },
    active: function active(options) {
        this.root.classList.remove("hide");
        this.options = options;
        this.setActiveTrigger();
    },
    setActiveTrigger: function setActiveTrigger() {
        this.scrollEventListener.setScrollTarget(this.root, this.scrollTriggerEvent.bind(this));
    },
    scrollTriggerEvent: function scrollTriggerEvent() {
        console.log("scroll trigger");
        this.trigger("search-paging", this.options);
        //                this.api.searchMoreArticles(this.keyword, this.page);
    }
});
});

riot.tag('searching', ' <div class="searching"><div class="ashgrey-background"></div></div>', 'searching { position: relative; width: 100%; top: 0; left: 0; display: block; text-align: center; font-size: 1.2em; color:gray; } searching.hide { display: none; } searching .searching > div { margin: 0 auto; border-radius: 50%; height: 30px; width: 30px; animation: search-ticker 1s infinite ease-in-out; -webkit-animation: search-ticker 1s infinite ease-in-out; -moz-animation: search-ticker 1s infinite ease-in-out; } @keyframes search-ticker { 0% { transform: scale(0); } 100% { transform: scale(1); opacity: 0; } } @-webkit-keyframes search-ticker { 0% { -webkit-transform: scale(0); } 100% { -webkit-transform: scale(1); opacity: 0; } } @-moz-keyframes search-ticker { 0% { -moz-transform: scale(0); } 100% { -moz-transform: scale(1); opacity: 0; } }', function(opts) {
var self = this;
Object.assign(self, {
    show: function show() {
        this.root.classList.remove("hide");
    },
    hide: function hide() {
        this.root.classList.add("hide");
    }
});
});

riot.tag('site-menu', '<div class="menu-button" onclick="{ toggleMenu }"><div class="bold" style="position:absolute;top:10px;left:10px">≡</div></div><div class="menu-list close scroll"><div class="wrap justify"><ul><li><a class="jaunebrillant-border" href="index.html">トップ</a></li><li><a class="jaunebrillant-border" href="search.html">検索</a></li></ul><ul><li><a class="scarlet-border" href="search.html?s=%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB">アイドル</a></li><li><a class="scarlet-border" href="search.html?s=J-POP">J-POP</a></li><li><a class="scarlet-border" href="search.html?s=%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BB%E5%A3%B0%E5%84%AA">アニメ・<br >声優</a></li><li><a class="scarlet-border" style="font-size:0.5em" href="search.html?s=%E3%83%8B%E3%82%B3%E3%83%8B%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%BC%E3%82%B8%E3%83%83%E3%82%AF">ニコニコ<br >ミュージック</a></li></ul>  <ul><li><a class="heliotrope-border" href="http://info.dwango.co.jp">運営会社</a></li><li><a class="heliotrope-border" href="rule.html">利用規約</a></li><li><a class="heliotrope-border" href="http://info.dwango.co.jp/managerial/personal.html">個人情報<br >保護方針</a></li><li><a class="heliotrope-border" style="font-size:0.5em" href="support.html">お問い合わせ</a></li></ul></div></div>', 'site-menu * { box-sizing: border-box; } site-menu .menu-button { position:fixed; top: 20px; right: -100px; width: 100px; height: 100px; background-color: #fff; box-shadow:0px 0px 2px; opacity: .5; transform: rotate(-30deg); transform-origin: 0 0; -webkit-transform: rotate(-30deg); -webkit-transform-origin: 0 0; -moz-transform: rotate(-30deg); -moz-transform-origin: 0 0; z-index:101; } site-menu .menu-button.show { transform: translateX(-50px) rotate(-30deg); -webkit-transform: translateX(-50px) rotate(-30deg); -moz-transform: translateX(-50px) rotate(-30deg); transition-duration: .5s; -webkit-transition-duration: .5s; -moz-transition-duration: .5s; } site-menu .menu-list { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; /*overflow-y: auto;*/ opacity: 0; background-color: rgba(0, 0, 0, .8); z-index:100; -webkit-transform: scale(0.98); transition: opacity .2s; -webkit-transition: .2s; -moz-transition: opacity .2s; } site-menu .menu-list.open { opacity: 1; -webkit-transform: scale(1); } site-menu .menu-list.close { display: none; } site-menu .menu-list .wrap { padding: 24px; } site-menu .menu-list ul { margin: 0; white-space: normal; /*width: 265px;*/ list-style-type: none; } site-menu .menu-list li { color: white; display: inline-block; vertical-align: top; height: 86px; width: 86px; white-space: normal; line-height: normal; margin: 0 4px 4px 0; overflow: hidden; } site-menu .menu-list a { height: 86px; width: 86px; display: table-cell; text-align: center; vertical-align: middle; font-size: 0.7em; padding: 5px; } site-menu .menu-list li a { color: white; font-weight: bold; border-style: solid; border-width: 8px; } site-menu .menu-list ul.sample li a { border:none; font-weight: 100; }', function(opts) {
var self = this;
var menuButtonTag = ".menu-button";
var menuTag = ".menu-list";
var showMenuClass = "show";
var openMenuClass = "open";
var closeMenuClass = "close";

Object.assign(self, {
    showMenuButton: function showMenuButton() {
        var menuButton = this.root.querySelector(menuButtonTag);
        menuButton.classList.add(showMenuClass);
    },
    openMenu: function openMenu() {
        var menuList = this.root.querySelector(menuTag);
        menuList.classList.remove(closeMenuClass);
        setTimeout(function () {
            menuList.classList.add(openMenuClass);
        }, 100);
    },
    closeMenu: function closeMenu() {
        var menuList = this.root.querySelector(menuTag);
        menuList.scrollTop = 0;
        menuList.classList.remove(openMenuClass);
        setTimeout(function () {
            menuList.classList.add(closeMenuClass);
        }, 100);
    },
    toggleMenu: function toggleMenu(e) {
        e.stopPropagation();
        if (this.isOpen) {
            this.closeMenu();
            this.isOpen = false;
        } else {
            this.openMenu();
            this.isOpen = true;
        }
    },
    onMounted: function onMounted() {
        var _this = this;

        this.isOpen = false;
        var ankerList = this.root.querySelectorAll("li a");
        for (var i = 0; i < ankerList.length; ++i) {
            var anker = ankerList[i];
            anker.onclick = function (e) {
                e.stopPropagation();
            };
        }
        setTimeout(function () {
            _this.showMenuButton();
        }, 300);
    }
});

self.on("mount", function () {
    self.onMounted();
});
});
