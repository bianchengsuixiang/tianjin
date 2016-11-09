var news=angular.module("myApp.news",["ui.router","ngSanitize"]);
news.controller("newsCtrl",["$scope","$http","$state","requireData","$rootScope",function($scope,$http,$state,requireData,$rootScope){
	if(localStorage.getItem("userName")!=null){//判断用户是否登录
		$("#tophead .login_wrap .unloginBtn").addClass("hide").siblings().removeClass("hide");
		$scope.userName=localStorage.getItem("userName");
	}else{
		$("#tophead .login_wrap .unloginBtn").removeClass("hide").siblings().addClass("hide");
	};
	$(document).on("click","#head .nav-right a",function(){//绑定切换子页面的点击切换类
		$("#head .nav-right li").removeClass("active");
		$(this).parent("li").addClass("active");
	});
	$scope.headFixed=true;
	angular.element(document).on("scroll",function(){//判断滚动事件
		if(angular.element(document).scrollTop()>120){
			$scope.headFixed=false;
			$scope.$apply();
		}else{
			$scope.headFixed=true;
			$scope.$apply();
		}
	});
	$http.get(requireData.requireUrl.newsType("0")).success(function(res){
		angular.element(document).scrollTop(1);
		$scope.news1=res.rows;
	});
	$http.get(requireData.requireUrl.newsType("1")).success(function(res){
		angular.element(document).scrollTop(1);
		$scope.news2=res.rows;
	});
	$http.get(requireData.requireUrl.newsType("2")).success(function(res){
		angular.element(document).scrollTop(1);
		$scope.news3=res.rows;
	});
	$http.get(requireData.requireUrl.newsType("3")).success(function(res){
		angular.element(document).scrollTop(1);
		$scope.news4=res.rows;
	});
}]);
news.controller("newsDetailCtrl",["$stateParams","$scope","$http","requireData",function($stateParams,$scope,$http,requireData){//详情页跳转控制器
	var newsId=$stateParams.newsId;
	$http.get(requireData.requireUrl.newsDetail(newsId)).success(function(res){
		angular.element(document).scrollTop(1);
		$scope.newsDetail=res.obj;
		$scope.content=res.obj.content;
	});
	$http.get(requireData.requireUrl.newsType("")).success(function(res){
		angular.element(document).scrollTop(1);
		$scope.hotNews=res.rows;
	})
}]);
$(function(){
	$(document).scroll(function(){
		var top = $(document).scrollTop();
		if(top>300){
			$(".qrcode-box").addClass("fixed");
		}else{
			$(".qrcode-box").removeClass("fixed");
		}
	});
});
