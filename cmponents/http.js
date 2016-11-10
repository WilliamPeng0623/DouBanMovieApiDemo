(function(angular){
	//由于默认ng提供的异步请求对象不支持自定义回调函数名称
	//ng随机分配的回调名称不被豆瓣支持，所以要自定义
	var http = angular.module('moviecat.services.http',[]);
	http.service('HttpService',['$window','$document',function($window,$document){
//		console.log($document);
		//url是一个： http://api.douban.com/abcdefg  ---> <script> --> html
		this.jsonp = function(url,data,callback){
			if(typeof data == 'function'){
				callback = data;
			}
			//1.挂载回调函数
			var cbFuncName = 'my_json_cb_' + Math.random().toString().replace('.',''); 
			$window[cbFuncName] = callback;
			
			//2.将data转换成url字符串的形式 {id:1,name:'zhangsan'} => id=1&name=zhangsan
			var queryString = url.indexOf('?') == -1 ? '?' : '&';
			for(var key in data){
				queryString += key + '=' + data[key] + '&';
			}
			//queryString = ?id=1&name=zhangsan&
			
			//3.处理url地址中的回调参数 url += callback=abcd
			queryString += 'callback=' + cbFuncName;
			//queryString = ?id=1&name=zhangsan&cb=my_json_cb_随机数
			
			//4.创建一个srcipt标签
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + queryString;
						
			//5.将script标签放到页面中
			$document[0].body.appendChild(scriptElement);
		};
	}]);
})(angular);
