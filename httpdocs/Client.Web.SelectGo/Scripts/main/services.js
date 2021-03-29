var localCache = {
    /**
     * timeout for cache in millis
     * @type {number}
     */
    timeout: 30000,
    /** 
     * @type {{_: number, data: {}}}
     **/
    data: {},
    remove: function (url) {
        delete localCache.data[url];
    },
    exist: function (url) {
        return !!localCache.data[url] && ((new Date().getTime() - localCache.data[url]._) < localCache.timeout);
    },
    get: function (url) {
        console.log('Getting in cache for url' + url);
        return localCache.data[url].data;
    },
    set: function (url, cachedData, callback) {
        localCache.remove(url);
        localCache.data[url] = {
            _: new Date().getTime(),
            data: cachedData
        };
        if ($.isFunction(callback)) callback(cachedData);
    }
};

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    if (options.cache) {
        var complete = originalOptions.complete || $.noop,
            url = originalOptions.url;
        //remove jQuery cache as we have our own localCache
        options.cache = false;
        options.beforeSend = function () {
            if (localCache.exist(url)) {
                complete(localCache.get(url));
                return false;
            }
            return true;
        };
        options.complete = function (data, textStatus) {
            localCache.set(url, data, complete);
        };
    }
});
Services = Class.extend({
    init: function (endpoint, params, onSuccess, noApi) {

        this.endpoint = endpoint;
        this.params = params;
        this.onSuccess = onSuccess;
        this.onFailure = function (e) { console.error(e); };
        this.cross_domain = true;
        this.host = (noApi == undefined ? (AppConfigs.HOST + "/api/") : AppConfigs.HOST + "/");
    },

    requestMethod: function (data, params, type) {
        var url;
        var self = this;
        if (params) params = jQuery.param(params);
        else params = jQuery.param(this.params);

        url = this.host + this.endpoint + "?" + (params);

        HvHelpers.loading.show();
        // Ajax::
        jQuery.ajax({
            beforeSend: function (request) {
                request.setRequestHeader("Authorization-Token", null);
            },
            contentType: "application/json; charset=utf-8",
            type: type,
			cache: true,
            url: url,
            data: JSON.stringify(data) || {},
            success: function (dt) {
                self.onSuccess(dt);
            },
            error: function (ex) {
                var error = JSON.stringify(ex);
                //HvHelpers.alert('Opps...Error:' + error.substring(0, 30) + "-> details in console", undefined, function () {
                    self.onFailure(error);
                //});

            },
            complete: function () {
                HvHelpers.loading.hide();
            }
        });
    },

    get: function (params) {
        if (!params) params = this.params;
        this.requestMethod(undefined, params, "GET");
    },

    put: function (data) {
        this.requestMethod(data, undefined, "PUT");
    },

    post: function (data) {
        this.requestMethod(data, undefined, "POST");
    },

    remove: function (params) {
        this.requestMethod(undefined, params, "DELETE");
    }

});

