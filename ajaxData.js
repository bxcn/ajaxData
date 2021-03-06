;
( function ( global, factory ) {
  'use strict';
  if ( typeof define === 'function' && (define.amd || define.cmd) ) {
    // AMD\CMD. Register as an anonymous module.
    define( function ( require, exports, module ) {
      return factory( global );
    } );

  } else if ( typeof exports === 'object' ) {
    module.exports = factory();
  } else {
    global.
    ajaxData = factory( global );
  }
}( typeof window !== "undefined" ? window : this, function ( window ) {

  "use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ajaxData = function (window) {

  function AjaxData() {
    var loading;
    // 加载Ajax前去显示
    function beforeSend(fn) {
      return function () {
        loading.show();
        if (fn) {
          fn();
        }
      };
    }

    this.ajax = function (param) {

      if (!param.url) {
        return;
      }
      if (_typeof(param.loading) == "object") {
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
        beforeSend: function beforeSend() {},
        complete: function complete() {},
        success: function success() {},
        error: function error() {}
      };

      param = $.extend(defaults, param);

      return $.ajax(param).always(function () {
        //当递延对象是解决(success)或拒绝(error)时被调用添加处理程序。
        loading.hide();
      });
    };
    this.post = function (param) {
      param["type"] = param.type || "POST";
      param.beforeSend = beforeSend(param.beforeSend);
      //param.complete = complete(param.complete);
      return this.ajax(param);
    };

    this.get = function (param) {
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

  var PromiseFetchData = function () {
    function PromiseFetchData() {
      _classCallCheck(this, PromiseFetchData);

      this.fetchData = null;
    }

    /**
     * 请求fetch
     * @param param
     *     param.url,
     *     param.data
     * @returns {*}
     */


    _createClass(PromiseFetchData, [{
      key: "postAjax",
      value: function postAjax(param) {
        var data = param.data || "";
        return fetch(param.url, {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: data
        });
      }
    }, {
      key: "getAjax",
      value: function getAjax(param) {
        console.log('getAjax');
        var data = param.data || "";
        var url = param.url;
        url = url.indexOf('?') > -1 ? url + '&' + data : url + '?' + data;
        return fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json"
          }
        }).catch(function (err) {
          console.log("fetch地址请求无效:" + param.url);
        });
      }
    }, {
      key: "post",
      value: function post(param) {
        this.fetchData = this.postAjax(param);
        return this;
      }
    }, {
      key: "get",
      value: function get(param) {
        this.fetchData = this.getAjax(param);
        return this;
      }
    }, {
      key: "done",
      value: function done(callback) {
        return this.then(callback);
      }
    }, {
      key: "always",
      value: function always(callback) {
        return this.then(callback);
      }
    }, {
      key: "then",
      value: function then(callback) {
        this.fetchData.then(callback);
        return this;
      }
    }, {
      key: "fail",
      value: function fail(callback) {
        this.fetchData.catch(callback);
        return this;
      }
    }, {
      key: "catch",
      value: function _catch(callback) {
        this.fail(callback);
        return this;
      }
    }]);

    return PromiseFetchData;
  }();
  /**
   * fetch包装，兼容jquery的done模式
   * POST请求
   */


  var PromiseDataWrapper = function (_PromiseFetchData) {
    _inherits(PromiseDataWrapper, _PromiseFetchData);

    function PromiseDataWrapper(param) {
      _classCallCheck(this, PromiseDataWrapper);

      var _this = _possibleConstructorReturn(this, (PromiseDataWrapper.__proto__ || Object.getPrototypeOf(PromiseDataWrapper)).call(this));

      _this.defaults = {
        beforeSend: function beforeSend() {},
        complete: function complete() {},
        success: function success() {},
        error: function error() {}
      };

      _this.defaults = Object.assign(_this.defaults, param);

      return _this;
    }
    /**
     *
     * @param response 返回对象
     * @returns {*}
     */


    _createClass(PromiseDataWrapper, [{
      key: "status",
      value: function status(response) {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      }
    }, {
      key: "beforeSend",
      value: function beforeSend() {
        this.defaults.beforeSend();
        console.log('beforeSend');
      }
    }, {
      key: "complete",
      value: function complete() {
        this.defaults.complete();
        console.log('complete');
      }
    }, {
      key: "success",
      value: function success() {
        this.defaults.success();
        console.log('success');
      }
    }, {
      key: "error",
      value: function error() {
        this.defaults.error();
        console.log('error');
      }

      /**
       * 转换成JSON对象
       * @param response
       * @returns {*}
       */

    }, {
      key: "json",
      value: function json(response) {
        return response.json();
      }

      /**
       * 包装数据
       * @param param
       * @returns {Promise.<TResult>}
       */

    }, {
      key: "wrapper",
      value: function wrapper(promise) {
        var that = this;
        var fetch = promise.then(that.status).then(that.json).catch(function (err) {
          that.error();
        });

        this.success();
        return fetch;
      }

      // @Override

    }, {
      key: "post",
      value: function post(param) {
        this.beforeSend();
        this.fetchData = this.wrapper(this.postAjax(param));
        this.complete();
        return this;
      }

      // @Override

    }, {
      key: "get",
      value: function get(param) {
        this.beforeSend();
        this.fetchData = this.wrapper(this.getAjax(param));
        this.complete();
        return this;
      }
    }]);

    return PromiseDataWrapper;
  }(PromiseFetchData);

  var _ajaxData = void 0;
  if (typeof fetch == 'function') {
    // 导出默认对象
    _ajaxData = {
      get: function get(param) {
        return new PromiseDataWrapper(param).get(param);
      },
      post: function post(param) {
        return new PromiseDataWrapper(param).post(param);
      }
    };
  } else {
    _ajaxData = new AjaxData();
  }

  return _ajaxData;
}(window);
	window.ajaxData = ajaxData;
  return ajaxData;

} ) );
