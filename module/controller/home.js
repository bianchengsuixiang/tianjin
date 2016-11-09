angular.module("myApp.home",["ui.router"]).controller("homeCtrl",["$scope","$http","requireData","$state",function($scope,$http,requireData,$state){
	if(localStorage.getItem("userName")!=null){//判断用户是否登录
		$("#homeHeader .login .unloginBtn").addClass("hide").siblings().removeClass("hide");
		$scope.userName=localStorage.getItem("userName");
	}else{
		$("#homeHeader .login .unloginBtn").removeClass("hide").siblings().addClass("hide");
	}
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
	var bannerSwiper = new Swiper('.banner-container',{
		autoplay : 3000,//可选选项，自动滑动
		loop : true,//可选选项，开启循环
		pagination : '.swiper-pagination',//显示分页器
		paginationClickable : true ,//点击分页器可以切换
		autoplayDisableOnInteraction : false,//用户滑动后可以继续轮播
        effect: 'fade'
	});//初始化背景图
	//"html/sun1.html"
//	$http.get("data/hotNews.js").success(function(res){
//		$scope.hotNews=res;
//	});
//	$http.get("data/report.js").success(function(res){
//		$scope.report=res[0];
//		$scope.reports=res.slice(1);
//	});
	(function(){//绑定首页5个部分的模块
		$http.get(requireData.requireUrl.homeSun("3")).success(function(res){//阳光私募模块
			angular.element(document).scrollTop(1);
			$scope.homeSunPros=res.rows;
		})
		$http.get(requireData.requireUrl.homePrivatePro("3")).success(function(res){//私募股权模块
			angular.element(document).scrollTop(1);
			$scope.homePrivatePros=res.rows;
		});
		requireData.requireUrl.getTrustProductFilter({"rows":"3"},function(res){//信托精品模块
			angular.element(document).scrollTop(1);
			$scope.homeTrustPros=res.obj;
		});
		$http.get(requireData.requireUrl.newsType(""),{params:{"rows":"3"}}).success(function(res){//新闻资讯模块
			angular.element(document).scrollTop(1);
			$scope.homeHotNew=res.rows;
		})
		$http.get(requireData.requireUrl.newsType("4"),{params:{"rows":"7"}}).success(function(res){//媒体报道模块
			angular.element(document).scrollTop(1);
			$scope.homeReport=res.rows[0];
			$scope.homeReports=res.rows.slice(1);
		})
	})();
}]);