var comprehensiveSubject=angular.module("myApp.comprehensiveSubject",["ui.router","ngSanitize"]);
comprehensiveSubject.controller("comprehensiveSubjectCtrl",["$scope","$http","$state","requireData","$rootScope",function($scope,$http,$state,requireData,$rootScope){
//	$(document).on("click","#head .nav-right a",function(){//绑定切换子页面的点击切换类
//		$("#head .nav-right li").removeClass("active");
//		$(this).parent("li").addClass("active");
//	});
	if(localStorage.getItem("userName")!=null){//判断用户是否登录
		$("#homeHeader .login .unloginBtn").addClass("hide").siblings().removeClass("hide");
		$scope.userName=localStorage.getItem("userName");
	}else{
		$("#homeHeader .login .unloginBtn").removeClass("hide").siblings().addClass("hide");
	};
	$scope.headFixed=true;
	$(document).scroll(function(){//判断滚动事件
		if($(document).scrollTop()>120){
			$("#head2").removeClass("hide");
		}else{
			$("#head2").addClass("hide");
		}
	});
	(function(){//绑定首页5个部分的模块
		$http.get(requireData.requireUrl.homeSun("3")).success(function(res){//阳光私募模块
			$scope.homeSunPros=res.rows;
		})
		$http.get(requireData.requireUrl.homePrivatePro("3")).success(function(res){//私募股权模块
			$scope.homePrivatePros=res.rows;
		});
		requireData.requireUrl.getTrustProductFilter({"rows":"3"},function(res){//信托精品模块
			$scope.homeTrustPros=res.obj;
		});
		$http.get(requireData.requireUrl.newsType(""),{params:{"rows":"3"}}).success(function(res){//新闻资讯模块
			$scope.homeHotNew=res.rows;
		})
		$http.get(requireData.requireUrl.newsType("4"),{params:{"rows":"7"}}).success(function(res){//媒体报道模块
			$scope.homeReport=res.rows[0];
			$scope.homeReports=res.rows.slice(1);
		})
	})();
}]);
