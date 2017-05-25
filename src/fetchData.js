/**
 * fetch包装，兼容jquery的done模式
 * POST请求
 */
class PromiseFetchData {
  constructor () {
    this.fetchData = null;
  }

  /**
   * 请求fetch
   * @param param
   *     param.url,
   *     param.data
   * @returns {*}
   */
  postAjax ( param ) {
    let data = param.data || "";
    return fetch( param.url, {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:data
    } );
  }

  getAjax ( param ) {
    let data = param.data || "";
    let url = param.url;
    url = url.indexOf('?') > -1 ? (url + '&' + data) : url + '?' + data
    return fetch(url, {
      method:"get",
      headers:{
        "Content-Type":"application/json"
      }
    } ).catch( function( err ) {
      console.log( "fetch地址请求无效:" + param.url );
    } );
  }

  post ( param ) {
    this.fetchData = this.postAjax( param );
    return this;
  }

  get ( param ) {
    this.fetchData = this.getAjax( param );
    return this;
  }

  done ( callback ) {
    this.fetchData.then( callback );
    return this;
  }

  then ( callback ) {
    this.fetchData.then( callback );
    return this;
  }

  fail ( callback ) {
    this.fetchData.catch( callback );
    return this;
  }

  catch ( callback ) {
    this.fail( callback );
    return this;
  }
}
/**
 * fetch包装，兼容jquery的done模式
 * POST请求
 */
class PromiseDataWrapper extends PromiseFetchData {
  constructor () {
    super();
  }
  /**
   *
   * @param response 返回对象
   * @returns {*}
   */
  status ( response ) {
    if ( response.status >= 200 && response.status < 300 ) {
      return Promise.resolve( response );
    }
    else {
      return Promise.reject( new Error( response.statusText ) );
    }
  }

  /**
   * 转换成JSON对象
   * @param response
   * @returns {*}
   */
  json ( response ) {
    return response.json();
  }

  /**
   * 包装数据
   * @param param
   * @returns {Promise.<TResult>}
   */
  wrapper ( promise ) {
    let that = this;
    return promise
    .then( that.status )
    .then( that.json );
  }

  // @Override
  post ( param ) {
    this.fetchData = this.wrapper( this.postAjax( param ) );
    return this;
  }

  // @Override
  get ( param ) {
    this.fetchData = this.wrapper( this.getAjax( param ) );
    return this;
  }
}
// 导出默认对象
const fetchData = {
  get:( param ) => {
    return (new PromiseDataWrapper()).get( param );
  },
  post:( param ) => {
    return (new PromiseDataWrapper()).post( param );
  }
};
