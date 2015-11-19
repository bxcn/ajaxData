ajaxData
=======================
一个简单的ajax请求组件，ajaxData依赖jquery组件；在引用ajaxData前请先引用jquery组件，jquery支持1.2以上版本

```
    <script src="lib/jquery.min.js"></script>
    <script src="ajaxData.js"></script>
```
    
#opations对象参数:
 * url：发送请求的地址 (必填)；
 * data：发送到服务器的数据 (缺省)；
 * success：请求成功后回调参数 (缺省)；
 * error：请求失败后回调参数 (缺省)；
 * type：发送请求类型，默认post (缺省)；
 * typeData：请求成功后返回的数据格式，默认json (缺省)；
 * async：是否异步发送请求， 默认true (缺省)；
 * cache：设置为 false 将不缓存此页面 (缺省)；

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





