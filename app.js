define(function(require, exports, module) {
  const ajaxData = require('ajaxData')();
  // Get
  ajaxData.get({
    url: "json/add.json",
    data: "name=ajaxData&anthor=bxcn"
  }).done(function(json) {
    alert("Get successfull");
  });
  //ajax
  ajaxData.ajax({
    type: "get",
    url: "json/add.json",
    data: {
      name: "bxcn"
    }
  }).done(function(json) {
    alert(" ajax -> get successfull");
  });
  // Post
  ajaxData.post({
    type: "get",
    url: "json/error.json",
    data: {
      name: "bxcn"
    }
  }).fail(function(json) {
    alert("Post fail");
  });

})