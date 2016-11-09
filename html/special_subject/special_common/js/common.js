$(function(){
	//登录注册窗
	$("#ToLoginBtn").click(function(){
		$("#login").removeClass("hide");
		$("#login form[name='login']").removeClass("hide");
		$("#login form[name='register']").addClass("hide");
		$(".registerTitle").removeClass("active");
		$(".loginTitle").addClass("active");
	});
	$("#ToRegisterBtn").click(function(){
		$("#login").removeClass("hide");
		$("#login form[name='login']").addClass("hide");
		$("#login form[name='register']").removeClass("hide");
		$(".loginTitle").removeClass("active");
		$(".registerTitle").addClass("active");
	});
	$(".loginTitle").click(function(){
		$(this).addClass("active");
		$(this).siblings(".registerTitle").removeClass("active");
		$("#login form[name='login']").removeClass("hide");
		$("#login form[name='register']").addClass("hide");
	});
	$(".registerTitle").click(function(){
		$(this).addClass("active");
		$(this).siblings(".loginTitle").removeClass("active");
		$("#login form[name='register']").removeClass("hide");
		$("#login form[name='login']").addClass("hide");
	});
	$(function(){//预约用户验证功能
		$scope.reservationBtn=function(){
			var nameReg=/^[\u4E00-\u9FA5]{2,6}$/;//中文匹配正则表达式，最多6位中文
			var telReg=/^1[34578][0-9]{9}$/;//匹配手机号正则表达式，开头为1第二位数是34578中一个，最后9位为数字
			var nameResult=nameReg.test($scope.reservationName);
			var telResult=telReg.test($scope.reservationTel);
			if(!nameResult){
				$scope.input1=true;
				$scope.reservationNameErr=false;
			}else{
				$scope.input1=false;
				$scope.reservationNameErr=true;
			}
			if(!telResult){
				$scope.input2=true;
				$scope.reservationTelErr=false;
			}else{
				$scope.input2=false;
				$scope.reservationTelErr=true;
			}
			if(nameResult&&telResult){//用户姓名和手机皆有效执行
				//productId,productType,userName,tel
				var productId=localStorage.getItem("productId");
				$http.get(requireData.requireUrl.reservation("1","1",$scope.reservationName,$scope.reservationTel)).success(function(res){
					console.log(res);
				});
				//预约成功提示
				$(".successReservation").removeClass("hide");
				$(".successReservation").prev("div").addClass("hide");
				//预约成功确定按钮
				$(".successReservation .sumbitBox button").click(function(){
					$(".successReservation").addClass("hide");
					$("#reservationModal").addClass("hide");
				});
			}
		};
	})();
	$(function(){//用户登录验证功能
		$scope.loginBtn=function(){
			var telReg=/^1[34578][0-9]{9}$/;//匹配手机号正则表达式，开头为1第二位数是34578中一个，最后9位为数字
			var pwdReg=/^[0-9a-zA-Z]{6,16}$/;//匹配密码正则表达式，为6^12数字或字母的组合
			var telResult=telReg.test($scope.loginTel);
			var pwdResult=pwdReg.test($scope.loginPwd);
			if(!telResult){
				$scope.input3=true;
				$scope.loginTelErr=false;
			}else{
				$scope.input3=false;
				$scope.loginTelErr=true;
			}
			if(!pwdResult||$scope.loginPwd==null){
				$scope.input4=true;
				$scope.loginPwdErr=false;
			}else{
				$scope.input4=false;
				$scope.loginPwdErr=true;
			}
			if(telResult&&pwdResult&&$scope.loginPwd!=null){//手机号和密码都符合要求的情况下执行
				if($scope.rememberChecked){//选择记住功能
					localStorage.setItem("userName",$scope.loginTel);
					location.href="index.html";
				}else{
					sessionStorage.setItem("userName",$scope.loginTel);
					location.href="index.html";
				}
			}
		};
	})();
	$(function(){//用户注册验证功能
		$scope.registerBtn=function(){
			var telReg=/^1[34578][0-9]{9}$/;//匹配手机号正则表达式，开头为1第二位数是34578中一个，最后9位为数字
			var pwdReg=/^[0-9a-zA-Z]{6,16}$/;//匹配密码正则表达式，为6^16数字或字母的组合
			var valReg=/^[0-9a-zA-Z]{4}$/;//验证码匹配规则，为4位数字或字母的组合
			var phoneCodeReg=/^[0-9]{4,6}$/;//手机验证码匹配规则，为4^6位数字；
			var telResult=telReg.test($scope.registerTel);
			var valResult=valReg.test($scope.registerVal);
			var phoneCodeResult=phoneCodeReg.test($scope.registerPhoneCode)
			var pwdResult=pwdReg.test($scope.registerPwd);
			if(!telResult){
				$scope.input5=true;
				$scope.registerTelErr=false;
			}else{
				$scope.input5=false;
				$scope.registerTelErr=true;//
			}
			if(!valResult){
				$scope.input6=true;
				$scope.registerValErr=false;
			}else{
				$scope.input6=false;
				$scope.registerValErr=true;
			}
			if(!phoneCodeResult){
				$scope.input7=true;
				$scope.registerPhoneCodeErr=false;
			}else{
				$scope.input7=false;
				$scope.registerPhoneCodeErr=true;
			}
			if(!pwdResult||$scope.registerPwd==null){
				$scope.input8=true;
				$scope.registerPwdErr=false;
			}else{
				$scope.input8=false;
				$scope.registerPwdErr=true;
			}
			if($scope.registerRepwd!=$scope.registerPwd||$scope.registerRepwd==null){
				$scope.input9=true;
				$scope.registerRepwdErr=false;
			}else{
				$scope.input9=false;
				$scope.registerRepwdErr=true;
			}
			if(telResult&&valResult&&phoneCodeResult&&pwdResult&&$scope.registerPwd!=null&&$scope.registerPwd==$scope.registerRepwd){//密码不为空且验证全部通过的情况
				requireData.requireUrl.register({"phone":$scope.registerTel,"captcha":$scope.registerVal,"phoneCode":$scope.registerPhoneCode,"loginPwd":$scope.registerPwd},function(res){
					console.log(res);
				});
			}
		}
	})();
});
var myApp=angular.module("myIndex",["myApp.home","myApp.sun","myApp.trust","myApp.news","myApp.private"]).config(function($stateProvider,$urlRouterProvider,$httpProvider){
	
	$httpProvider.interceptors.push('timestampMarker');
}).controller("indexCtrl",["$scope","$state","$http","requireData","$rootScope",function($scope,$state,$http,requireData,$rootScope){
	
	
}]);
myApp.controller("reservationFixedCtrl",["$scope",function($scope){
	$scope.reservationFixedTabOut=function(){//底部预约模块,点击出现模块二
		$scope.reservationFixed1=true;
		$scope.reservationFixed2=false;
	};
	$scope.reservationFixedTabOff=function(){//底部预约模块,点击出现模块一
		$scope.reservationFixed1=false;
		$scope.reservationFixed2=true;
	};
}]);
myApp.factory('timestampMarker',function(){//自定义路由切换服务状态
	var timestampMarker = {
		request:function(config){
			NProgress.start();
			return config;
		},
		response:function(response){
			setTimeout(function(){
				NProgress.done();
			},200);
			return response;
		}
	};
	return timestampMarker;
});
myApp.service("requireData",["$http",function ($http) {
//	var baseUrl="http://120.76.210.161:8080/site/api/";//金融资讯请求地址（李小龙）
//	var baseUrl="http://120.76.210.161:8080/site/api/";//阿里云服务器地址
//	var baseUrl="http://172.16.1.208/site/api/";//登录注册请求地址（黄冬燕）
	var baseUrl="http://172.16.1.133:8080/site/api/";//预约请求地址（李亚峰）
	//http://172.16.1.133:8080/site/api/user/reservation/add.g?reservation_pro_id=1&product_type=1&name=23425&phone=13538928550&callback=callbackfun
	this.requireUrl={//封装URL请求地址
		"newsType":function(newsType){//封装获取不同资讯类型的请求地址
			return baseUrl+"news/list.g?newsType="+newsType;
		},
		"newsDetail":function(newsId){//封装获取特定ID的资讯详情的请求地址
			return baseUrl+"news/show.g?id="+newsId;
		},
		"register":function (params,callback){
			return $.ajax({
				url: baseUrl+"user/customer/saveCustomerAdd.g",
				type: "POST",
				data: params,
				success:callback,
				dataType:"JSON"
			});
		},
		"login":function(){
			return baseUrl;
		},
		"registerVal":function(){
			return baseUrl+"user/customer/captcha.g";
		},
		"phoneCode":function(tel){
			return baseUrl+"user/customer/getSms.g?phone="+tel;
		},
		"reservation":function(productId,productType,userName,tel){
			return baseUrl+"user/reservation/add.g?reservation_pro_id="+productId+"&product_type="+productType+"&name="+userName+"&phone="+tel;
		},
		"GetTrustProduct":function(){
			return baseUrl+"product/trustCapital//list.g";
		},
		"getTrustProDetail":function(proId){
			return baseUrl+""
		}
	}
}]);