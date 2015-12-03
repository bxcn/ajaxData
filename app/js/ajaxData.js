(function(){
  var console = console || {log:function(){}};

  var ajaxData = {

    ajax: function( param ) {

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
      var _async = param.async;
      var _data = param.data || null;
      var _url = param.url || null;
      var _success = param.success || function() {
          console.log("操作成功！");
        }
      var _error = param.success || function() {
          console.log("操作失败！");
        }
      var _statusCode =  {
        404: function () {
          console.log('页面未找到！');
        }
      };

      if ( !_url ) {
        console.log("请求参数不完整！ url is null");
        return;
      }

      $.ajax({
        type: _type,
        dataType:_dataType,
        url: _url,
        async: _async,
        data: _data,
        cache:_cache,
        statusCode:_statusCode,
        success: _success,
        error: _error
      });
      return $;
    },
    post: function( param ) {
      param["type"] = param.type || "POST";
      this.ajax(param);
    },

    get: function( param ) {
      param["type"] = param.type || "GET";
      this.ajax(param);
    }
  };

  window["ajaxData"] = ajaxData;

})();
