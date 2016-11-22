ajaxData异步请求
=======================

```
    <script src="lib/jquery.min.js"></script>
    <script src="ajaxData.js"></script>
```

它的价值所在：一个简单的ajax请求插件，ajaxData基于jquery插件；在引用ajaxData前请先引用jquery组件，ajaxData可以减少一些不必要每次都写的参数和增加一些在请求前和请求完成后的Loading效果;
    
#opations对象参数:
 * url：发送请求的地址 (必填)；
 * data：发送到服务器的数据 (缺省)；
 * beforeSend：请求前调用 (缺省)；
 * success：请求成功后回调参数 (缺省)；
 * complete：在请求成功之后调用 (缺省)；
 * error：请求失败后回调参数 (缺省)；
 * type：发送请求类型，默认post (缺省)；
 * typeData：请求成功后返回的数据格式，默认json (缺省)；
 * async：是否异步发送请求， 默认true (缺省)；
 * cache：设置为false将不缓存此页面，默认false (缺省)；

#使用实例：

```
  ajaxData.get(options);
```
  
调用get方式：
```
    ajaxData.get({
      url:"json/add.json",
      data:"name=ajaxData&anthor=bxcn",
      success: function( json ){
        console.log("successfull");
      }
    });
```
调用ajax方式：
```
    ajaxData.ajax({
      url:"json/add.json",
      data:{name:"bxcn"},
      success: function( json ){
        console.log("successfull");
      }
    });
```
调用post方式：
```
    ajaxData.post({
      url:"json/add.json",
      data:{name:"bxcn"},
      success: function( json ){
        console.log("successfull");
      }
    });
```

请求成功执行done, 失败执行fail, 无论成功还是失败都会执行always的链式调用：
```
    ajaxData.post({
      url:"json/add.json",
      data:{name:"bxcn"}
    })
    .done(function(result){
      console.log("successfull");
    })
    .fail(function(result){
     console.log("fail");
    })
    .always(function(result){
     console.log("always");
    });
```

ajaxData是对jauery的ajax方法的一个扩展，不直接以来jquery的ajax.可以扩展ajax请求之前增加一个显示蒙板效果，在加载完成之后来隐藏这个蒙板.

#扩展代码：
```
  // 加载前的一个遮罩层对象
function AjaxDataLoading(id) {
  var bg = $(id);
  // 加载Ajax前去显示
  function beforeSend(fn) {
    return function() {
      bg.show();
      if (fn) {
        fn();
      }
    }
  }

  function complete(fn) {
    return function() {
      bg.hide();
      if (fn) {
        fn();
      }
    }
  }
  this.ajax = function(param) {
    param.beforeSend = beforeSend(param.beforeSend);
    param.complete = complete(param.complete);
    return ajaxData.ajax(param);
  }
  this.post = function(param) {
    param.beforeSend = beforeSend(param.beforeSend);
    param.complete = complete(param.complete);
    return ajaxData.post(param);
  }
  this.get = function(param) {
    param.beforeSend = beforeSend(param.beforeSend);
    param.complete = complete(param.complete);
    return ajaxData.get(param);
  }

  this.show = function() {
    bg.show();
  }

  this.hide = function() {
    bg.hide();
  }

  return this;
}

```

#扩展代码调用：
```  
  var ajaxDataLoading = new AjaxDataLoading("#loading");

  ajaxDataLoading.get({
    url:"json/add.json",
    data:"name=ajaxData&anthor=bxcn",
    success: function( json ){
      console.log("successfull");
    }
  });

  根据不现的蒙板显示效果，我们可以扩展多个样式；
  只需要创建多个AjaxDataLoading实例，根据请求类型调用它的get、post、ajax其中一个方法即可
  
  var ajaxDataLoading1 = new AjaxDataLoading("#loading1");
  var ajaxDataLoading2 = new AjaxDataLoading("#loading1");
```

#ajaxData的CMD模式：
```  
  var ajaxData = require("ajaxData").init("#loading");

  ajaxData.get({
    url:"json/add.json",
    data:"name=ajaxData&anthor=bxcn"
  }).done(function(json){
    console.log("successfull");
  });

  把ajaxData和AjaxDataLoadingr的功能合成一个文件了，通过给ajaxData的init方法传一个参数，参数是一个元素的ID,在ajax请求完成前显示加载图片，完成后自动隐藏
```





