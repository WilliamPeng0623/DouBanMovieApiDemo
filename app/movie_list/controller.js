(function(angular) {
	'use strict';
	
	//创建热映模块
	var module = angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http']);
	//配置模块的路由
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}])

	module.controller('MovieListController', ['$scope','$route','$routeParams','HttpService','AppConfig',function($scope,$route,$routeParams,HttpService,AppConfig) {
		var count = AppConfig.pageSize;
		var page = parseInt($routeParams.page);
		var start = (page - 1) * count;
		//处理控制器逻辑
		//控制器任务
		//1.暴露数据
//		$scope.subjects = []];
		//测试$http服务
		$scope.loading = true;
		$scope.subjects = [];
		$scope.message = '';
		$scope.totalCount = 0;
		$scope.totalPage = 0;
		$scope.titile = 'loading...';
		$scope.currentPage = page;
		
		HttpService.jsonp(AppConfig.listApiAddress+$routeParams.category,{start:start,count:count,q:$routeParams.q,city:'广州'},function(data){
			$scope.title = data.title;
			$scope.subjects = data.subjects;
			$scope.totalCount = data.total;
			$scope.totalPage = Math.ceil($scope.totalCount / count);
			$scope.loading = false;
			$scope.$apply();
			//$apply的作用就是让指定的表达式重新同步
			
		});
		
		//暴露行为 上一页 下一页
		$scope.go = function(page){
			if(page>=1&&page<=$scope.totalPage){
				$route.updateParams({page:page});
			}	
		}
//		
//		var dbApi = 'http://api.douban.com/v2/movie/in_theaters';
//		
//		//在ng中使用jsonp做跨域请求就必须给当前地址后加上参数 名字无所谓多为callback， 值必须是JSON_CALLBACK
//		var jsonppp = '?callback=JSON_CALLBACK';
//		
//		$http.jsonp(dbApi+jsonppp)
//		.then(function(res){
//			if(res.status == 200){
//				$scope.subjects = res.data.subjects;
//			}
//			else{
//				$scope.message = '获取数据失败, 错误信息'+ res.statusText;
//			}
//		},function(err){
//			console.log(err);
//			$scope.message = '获取数据失败, 错误信息'+ err.statusText;
//		});

		

	}]);
})(angular)