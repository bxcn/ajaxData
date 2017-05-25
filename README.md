ajaxData异步请求
=======================

``` html
	<script src="http://cdn.bootcss.com/jquery/1.12.3/jquery.js"></script>
	<script src="ajaxData.js"></script>
```

它的价值所在：一个简单的ajax请求插件，ajaxData基于jquery插件；在引用ajaxData前请先引用jquery组件，
ajaxData可以减少一些不必要每次都写的参数和增加一些在请求前和请求完成后的Loading效果;
例如：想通过对ajaxData请求前先判断是否登录。这时我们就可以扩展，增加一个isLogin:true,同时在ajaxData中增加对应的代码



#使用实例：

``` javascript
	ajaxData.get(options);
```

#opations对象参数:
 * loading: 加载loading效果dom元素或id字符串，默认是字符串(#loading)(缺省)
 * url：发送请求的地址 (必填)；
 * data：发送到服务器的数据 (缺省)；
 * beforeSend：请求前调用 (缺省)；
 * success：请求成功后回调参数 (缺省)；
 * complete：在请求成功之后调用 (缺省)；
 * error：请求失败后回调参数 (缺省)；
 * type：发送请求类型，默认post (缺省)；
 * dataType：请求成功后返回的数据格式，默认json (缺省)；
 * async：是否异步发送请求， 默认true (缺省)；
 * cache：设置为false将不缓存此页面，默认false (缺省)；


全局配置：
``` javascript
ajaxData = ajaxData();
```

调用get方式：
``` javascript
ajaxData.get({
	url:"json/add.json",
	data:"name=ajaxData&anthor=bxcn",
	success: function( json ){
		console.log("successfull");
	}
});
```
调用ajax方式：
``` javascript
ajaxData.ajax({
	url:"json/add.json",
	data:{name:"bxcn"},
	success: function( json ){
		console.log("successfull");
	}
});
```
调用post方式：
``` javascript
ajaxData.post({
 url:"json/add.json",
 data:{name:"bxcn"},
	success: function( json ){
		console.log("successfull");
	}
});
```

请求成功执行done, 失败执行fail, 无论成功还是失败都会执行always的链式调用：
``` javascript
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



#####新增加fetch的支持
命名为：`fetchData`
`fetchData`用法包含了jquery`fetchData`的`Ajax`请求和`fetch`语法
参考fetchData.js和fetchData.html

``` javascript
fetchData.get({
  url: "json/add.json",
  data: "name=ajaxData&anthor=bxcn"
}).done(function(json) {
  console.log("done方法");
}).then(function(json) {
  console.log("then方法");
});
```

