var updateQueryStringParam = function (key, value) {
    if (location.hash.indexOf("?") != -1)
        var hash = location.hash.substr(0, location.hash.indexOf("?"));
    else var hash = location.hash;
    var baseUrl = [location.protocol, '//', location.host, location.pathname, hash].join(''),
        urlQueryString = document.location.search,
        newParam = key + '=' + value,
        params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        var keyRegex = new RegExp('([\?&])' + key + '[^&]*');

        // If param exists already, update it
        if (urlQueryString.match(keyRegex) !== null) {
            params = urlQueryString.replace(keyRegex, "$1" + newParam);
        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }
    window.history.replaceState({}, "", baseUrl + params);
};


function getPageAj(page=1) {
    axios.get('api.php/?page=' + page).then(function (response) {
        app.data = response.data;
    })
}


var app = new Vue({
    el: '#app',
    props: {
        data: {
            type: Object,
            default: function () {
                return {
                    current_page: 1,
                    data: [],
                    from: 1,
                    last_page: 15,
                    next_page_url: null,
                    per_page: 10,
                    prev_page_url: null,
                    to: 1,
                    total: 20,
                }
            }
        },
        limit: {
            type: Number,
            default: 3
        }
    },
    mounted: function() {
        var queryDict = {};
        location.search.substr(location.search.indexOf("?") + 1).split("&")
            .forEach(function (item) {
                queryDict[item.split("=")[0]] = item.split("=")[1]
            });

        if (parseInt(queryDict.page)) getPageAj(queryDict.page);
        else getPageAj();
    },

    methods: {
        selectPage: function (page) {
            if (page === '...') return;
//                this.$emit('pagination-change-page', page);
            getPageAj(page);
            updateQueryStringParam('page', page);
        },

        getPages: function () {
            if (this.limit === -1) {
                return 0;
            }

            if (this.limit === 0) {
                return this.data.last_page;
            }

            var current = parseInt(this.data.current_page),
                last = parseInt(this.data.last_page),
                delta = parseInt(this.limit),
                left = current - delta,
                right = current + delta + 1,
                range = [],
                pages = [],
                l;

            if ((current - 1) > this.limit) pages.push('...');
            for (var i = 1; i <= last; i++) {
                if ((i >= left && i < right)) {
                    pages.push(i);
                }
            }
            if ((last - current) > this.limit) pages.push('...');

            return pages;
        }
    }


});
