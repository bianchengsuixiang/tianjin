var specialSubject=angular.module("myApp.specialSubject",["ui.router","ngSanitize"]);
specialSubject.controller("specialSubjectCtrl",["$scope","$http","$state","requireData","$rootScope",function($scope,$http,$state,requireData,$rootScope){
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
}]);
