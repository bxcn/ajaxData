var ajaxData = function(window) {

  function AjaxData() {
    var loading;
    // 加载Ajax前去显示
    function beforeSend(fn) {
      return function() {
        loading.show();
        if (fn) {
          fn();
        }
      };
    }

    this.ajax = function(param) {

      if (!param.url) {
        return;
      }
      if (typeof param.loading == "object") {
        loading = param.loading;
      } else if (typeof param.loading == "string") {
        loading = $(param.loading);
      } else if (document.getElementById('loading')) {
        loading = $("#loading");
      } else {
        loading = $('<div/>');
      }
      /**
       * typeData 类型:
       * "xml": 返回 XML 文档，可用 jQuery 处理。
       "html": 返回纯文本 HTML 信息；包含的script标签会在插入dom时执行。
       "script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了"cache"参数。'''注意：'''在远程请求时(不在同一个域下)，所有POST请求都将转为GET请求。(因为将使用DOM的script标签来加载)
       "json": 返回 JSON 数据 。
       "jsonp": JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
       "text": 返回纯文本字符串
       */
      var _cache = param.cache || false;
      var _type = param.type || "POST";
      var _dataType = param.dataType || "json";
      var _async = param.async || true;
      var _data = param.data || null;
      var _url = param.url || null;

      var _statusCode = {
        404: function _() {
          console.log('404: http://' + window.location.host + param.url);
        }
      };

      var defaults = {
        type: _type,
        dataType: _dataType,
        async: _async,
        data: _data,
        cache: _cache,
        statusCode: _statusCode,
        beforeSend: () => {},
        complete: () => {},
        success: () => {},
        error: () => {}
      };

      param = $.extend(defaults, param);

      return $.ajax(param).always(function() {
        //当递延对象是解决(success)或拒绝(error)时被调用添加处理程序。
        loading.hide();
      });
    };
    this.post = function(param) {
      param["type"] = param.type || "POST";
      param.beforeSend = beforeSend(param.beforeSend);
      //param.complete = complete(param.complete);
      return this.ajax(param);
    };

    this.get = function(param) {
      param["type"] = param.type || "GET";
      param.beforeSend = beforeSend(param.beforeSend);
      //param.complete = complete(param.complete);
      return this.ajax(param);
    };
    return this;
  }

  /**
   * fetch包装，兼容jquery的done模式
   * POST请求
   */
  class PromiseFetchData {
    constructor() {
      this.fetchData = null;
    }

    /**
     * 请求fetch
     * @param param
     *     param.url,
     *     param.data
     * @returns {*}
     */
    postAjax(param) {
      let data = param.data || "";
      return fetch(param.url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      });
    }

    getAjax(param) {
      console.log('getAjax')
      let data = param.data || "";
      let url = param.url;
      url = url.indexOf('?') > -1 ? (url + '&' + data) : url + '?' + data
      return fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).catch(function(err) {
        console.log("fetch地址请求无效:" + param.url);
      });
    }

    post(param) {
      this.fetchData = this.postAjax(param);
      return this;
    }

    get(param) {
      this.fetchData = this.getAjax(param);
      return this;
    }

    done(callback) {
      return this.then(callback);
    }

    always(callback) {
      return this.then(callback);
    }

    then(callback) {
      this.fetchData.then(callback);
      return this;
    }

    fail(callback) {
      this.fetchData.catch(callback);
      return this;
    }

    catch (callback) {
      this.fail(callback);
      return this;
    }
  }
  /**
   * fetch包装，兼容jquery的done模式
   * POST请求
   */
  class PromiseDataWrapper extends PromiseFetchData {
    constructor(param) {

        super();

        this.defaults = {
          beforeSend: () => {},
          complete: () => {},
          success: () => {},
          error: () => {}
        }

        this.defaults = Object.assign(this.defaults, param);

      }
      /**
       *
       * @param response 返回对象
       * @returns {*}
       */
    status(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    beforeSend() {
      this.defaults.beforeSend();
      console.log('beforeSend');
    }

    complete() {
      this.defaults.complete();
      console.log('complete');
    }

    success() {
      this.defaults.success();
      console.log('success');
    }
    error() {
      this.defaults.error();
      console.log('error');
    }


    /**
     * 转换成JSON对象
     * @param response
     * @returns {*}
     */
    json(response) {
      return response.json();
    }

    /**
     * 包装数据
     * @param param
     * @returns {Promise.<TResult>}
     */
    wrapper(promise) {
      let that = this;
      var fetch = promise
        .then(that.status)
        .then(that.json)
        .catch((err) => {
          that.error();
        });

      this.success();
      return fetch;
    }

    // @Override
    post(param) {
      this.beforeSend();
      this.fetchData = this.wrapper(this.postAjax(param));
      this.complete();
      return this;
    }

    // @Override
    get(param) {
      this.beforeSend();
      this.fetchData = this.wrapper(this.getAjax(param));
      this.complete();
      return this;
    }
  }

  let _ajaxData;
  if (typeof fetch == 'function') {
    // 导出默认对象
    _ajaxData = {
      get: (param) => {
        return (new PromiseDataWrapper(param)).get(param);
      },
      post: (param) => {
        return (new PromiseDataWrapper(param)).post(param);
      }
    };

  } else {
    _ajaxData = new AjaxData();
  }

  return _ajaxData;
}(window);
