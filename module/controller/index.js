var myApp=angular.module("myIndex",["myApp.home","myApp.sun","myApp.trust","myApp.news","myApp.private","myApp.specialSubject","myApp.comprehensiveSubject"]).config(function($stateProvider,$urlRouterProvider,$httpProvider){
	$urlRouterProvider.otherwise('/index');//默认点击链接地址为home.html模板
	$stateProvider.state("index",{//首页路由配置
		url:"/index",
		templateUrl:"module/views/home.html",
		controller:"homeCtrl",
	}).state("userSearch",{
		url:"/userSearch",
		templateUrl:"module/views/userSearch.html",
	})
	.state("about",{
		url:"/about",
		templateUrl:"module/views/aboutUs/about.html",
	}).state("contact",{
		url:"/contact",
		templateUrl:"module/views/aboutUs/contact.html",
	}).state("declaraction",{
		url:"/declaraction",
		templateUrl:"module/views/aboutUs/declaraction.html",
	}).state("join",{
		url:"/join",
		templateUrl:"module/views/aboutUs/join.html",
	}).state("media",{
		url:"/media",
		templateUrl:"module/views/aboutUs/media.html",
		controller:"homeCtrl",
	}).state("sun",{//阳光私募路由配置
		url:"/sun",
		templateUrl:"module/views/sun.html",
		controller:"sunCtrl",
	}).state("sun.home",{
		url:"/sun/home",
		templateUrl:"module/views/sunHome.html",
		controller:"sunHomeCtrl"
	}).state("sun.product",{
		url:"/sun/product",
		templateUrl:"module/views/sunProduct.html",
		controller:"funderCtrl"
	}).state("sun.productDetails",{
		url:"/sun/productDetails/:id",
		templateUrl:"module/views/sunProductDetails.html"
	}).state("sun.company",{
		url:"/sun/company",
		templateUrl:"module/views/sunCompany.html",
		controller:"sunCompanyCtrl"
	}).state("sun.companyDetails",{
		url:"/sun/companyDetails/:companyId",
		templateUrl:"module/views/sunCompanyDetail.html",
		controller:"sunCompanyDetailCtrl"
	}).state("private",{//私募股权路由配置
		url:"/private",
		templateUrl:"module/views/private.html",
		controller:"privateCtrl"
	}).state("private.home",{
		url:"/private/home",
		templateUrl:"module/views/privateHome.html",
		controller:"privateHomeCtrl"
	}).state("private.product",{
		url:"/private/product",
		templateUrl:"module/views/privateProduct.html",
		controller:"privateProCtrl"
	}).state("private.productDetail",{
		url:"/private/productDetail/:id",
		templateUrl:"module/views/privateProductDetail.html",
		controller:"privateProductDetailCtrl"
	}).state("private.company",{
		url:"/private/company/:productId",
		templateUrl:"module/views/privateCompany.html",
	}).state("trust",{//信托路由配置
		url:"/trust",
		templateUrl:"module/views/trust.html",
		controller:"trustCtrl",
	}).state("trust.home",{
		url:"/trust/home",
		templateUrl:"modul/views/trustHome.html",
		controller:"trustHomeCtrl"
	}).state("trust.product",{
		url:"/trust/product",
		templateUrl:"module/views/trustProduct.html",
	}).state("trust.company",{
		url:"/trust/company",
		templateUrl:"module/views/trustCompany.html",
		controller:"trustComCtrl",
	}).state("trust.comDetails",{
		url:"/trust/comDetails/:comId",
		templateUrl:"module/views/trustComDetails.html",
		controller:"trustComDetailCtrl",
	}).state("trust.productDetail",{
		url:"/trust/productDetail/:proId",
		templateUrl:"module/views/trustProductDetail.html",
		controller:"trustProDetailCtrl"
	}).state("news",{//金融资讯
		url:"/news",
		templateUrl:"module/views/news.html",
		controller:"newsCtrl",
	}).state("news.home",{
		url:"/news/home",
		templateUrl:"module/views/newsHome.html",
	}).state("news.trust",{
		url:"/news/trust",
		templateUrl:"module/views/newsTrust.html",
	}).state("news.focus",{
		url:"/news/focus",
		templateUrl:"module/views/newsFocus.html",
	}).state("news.opinion",{
		url:"/news/opionion",
		templateUrl:"module/views/newsOpinion.html",
	}).state("news.newsDetail",{
		url:"/news/newsDetail/:newsId",
		templateUrl:"module/views/newsDetail.html",
		controller:"newsDetailCtrl",
	}).state("specialSubject",{//专题页面路由配置
//		url:"",
		templateUrl:"module/views/specialSubject/specialSubject.html",
		controller:"specialSubjectCtrl",
	}).state("specialSubject.zhonghuizhifu",{//专题页面路由配置
		url:"/pe/zt-1",
		templateUrl:"module/views/specialSubject/zhonghuizhifu/index.html",
		controller:"specialSubjectCtrl"
	}).state("specialSubject.chuangmengtiandi",{//专题页面路由配置
		url:"/pe/zt-2",
		templateUrl:"module/views/specialSubject/chuangmengtiandi/index.html",
		controller:"specialSubjectCtrl"
	}).state("specialSubject.jungong",{//专题页面路由配置
		url:"/trust/zt-1",
		templateUrl:"module/views/specialSubject/jungong/jungong.html",
		controller:"specialSubjectCtrl"
	}).state("simu",{//综合页面路由配置
//		url:"/simu",
		templateUrl:"module/views/comprehensivePage/comprehensiveSubject.html",
		controller:"comprehensiveSubjectCtrl",
	}).state("simu.zt-1",{
		url:"/simu/zt-1",
		templateUrl:"module/views/comprehensivePage/zongheye.html",
		controller:"comprehensiveSubjectCtrl",		
	});
	$httpProvider.interceptors.push('timestampMarker');
}).controller("indexCtrl",["$scope","$state","$http","requireData","$rootScope",function($scope,$state,$http,requireData,$rootScope){
	$scope.loginOutBtn=function(){
		localStorage.removeItem("userName");
		location.reload();
	}
	$scope.sunUrl=localStorage.getItem("userName")==null?"module/template/sun1.html":"module/template/sun2.html";//默认加载阳光私募未登录模板
	(function(){//详情页跳转传参
		$rootScope.goSunProDetails=function(item){//跳转到阳光私募页面传参
			console.log(item.id);
			$state.go("sun.productDetails",{"id":item.id});
		};
		$rootScope.goPrivateProDetails=function(item){//跳转到私募产品详情页面传参
			$state.go("private.productDetail",{"id":item.id});
		};
		$rootScope.goTrustProDetails=function(item){
			$state.go("trust.productDetail",{"proId":item.id});
		}
		$rootScope.goNewsDetails=function(item){//跳转到金融资讯详情页面传参
			$state.go("news.newsDetail",{"newsId":item.id});
		};
	})();
	$rootScope.getRegisterVal=function(){//注册验证码
		$scope.reservationImg=requireData.baseUrl+"user/customer/captcha.g?a="+new Date();
	};
	var codeFlag=true;
	$rootScope.getPhoneCode=function(){//注册获取手机验证码
		$scope.input5=false;
		$scope.registerTelErr=true;
		$scope.input6=false;
		$scope.registerValErr=true;
		$scope.input7=false;
		$scope.registerPhoneCodeErr=true;
		$scope.input8=false;
		$scope.registerPwdErr=true;
		$scope.input9=false;
		$scope.registerRepwdErr=true;
		var telReg=/^1[34578][0-9]{9}$/;//匹配手机号正则表达式，开头为1第二位数是34578中一个，最后9位为数字
		var valReg=/^[0-9a-zA-Z]{4}$/;//验证码匹配规则，为4位数字或字母的组合
		var telResult=telReg.test($scope.registerTel);
		var valResult=valReg.test($scope.registerVal);
		if(!telResult){
			$scope.input5=true;
			$scope.registerTelErr=false;
		}else{
			$scope.input5=false;
			$scope.registerTelErr=true;//
		};
		if(!valResult){
			$scope.input6=true;
			$scope.registerValErr=false;
		}else{
			$scope.input6=false;
			$scope.registerValErr=true;
		};
		if(telResult&&valResult&&codeFlag){
			codeFlag=false;
			var codeLeft=60;
			$("#login form:eq(1) .phoneCode").css({
				"background":"gray"
			});
			var codeTimer=setInterval(function(){//每过一秒调用一次
				$("#login form:eq(1) .phoneCode").text(codeLeft);
				codeLeft--;
			},1000)
			setTimeout(function(){//一分钟后调用
				$("#login form:eq(1) .phoneCode").text("获取验证码").css({
					"background":"#e4883d"
				});
				codeFlag=true;
				clearInterval(codeTimer);//清除计时器
			},1000*60);
			$http.jsonp(requireData.requireUrl.phoneCode($scope.registerTel,$scope.registerVal),{params:{"callback":"JSON_CALLBACK"}}).success(function(res){
				if(res.code==-1){//获取手机验证码失败
					$("<div>"+res.msg+"</div>").appendTo($("#login form:eq(1) .phoneCode").parent()).css({
						"position":"absolute",
						"bottom":"-10px",
						"left":"20px",
						"height":"36px",
						"lineHeight":"36px",
						"color":"red",
						"border":"1px solid red",
						"textAlign":"center"
					}).animate({
						"opacity":0
					},3000);
				}
			});
		};
	};
	(function(){//预约弹窗功能
		$scope.reservationTabOff=function(){
			$scope.reservationOff=true;
			$scope.input1=false;
			$scope.reservationNameErr=true;
			$scope.input2=false;
			$scope.reservationTelErr=true;
			$(".successReservation").addClass("hide");
			$("#reservationModal").addClass("hide");
		};
		$scope.reservationTab=function(item,proType){
			var proId=item.id;
			$scope.reservationOff=false;
			if(typeof(item)=="string"){
				var proName=item;
			}else{
				var proId=item.id;
			}
			//预约成功切换
			$("#reservationModal").removeClass("hide");
			$(".successReservation").prev("div").removeClass("hide");
			$scope.reservationBtn=function(){//预约功能函数 
				var nameReg=/^[\u4E00-\u9FA5|a-z|A-Z]{2,20}$/;//中英文匹配正则表达式，最多20位
				var telReg=/^1[34578][0-9]{9}$/;//匹配手机号正则表达式，开头为1第二位数是34578中一个，最后9位为数字
				var nameResult=nameReg.test($scope.reservationName);
				var telResult=telReg.test($scope.reservationTel);
				if(!nameResult||$scope.reservationName==null){
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
					requireData.requireUrl.reservation({
						"reservation_pro_id":item.id==null?"":item.id,
						"reservation_pro_name":proName==null?"":proName,
						"product_type":proType,
						"name":$scope.reservationName,
						"phone":$scope.reservationTel
					},function(res){
						if(res.code==1){
							//预约成功提示
							$(".successReservation").removeClass("hide");
							$(".successReservation").prev("div").addClass("hide");
							//预约成功确定按钮
							$(".successReservation .sumbitBox button").click(function(){
								$(".successReservation").addClass("hide");
								$("#reservationModal").addClass("hide");
							});
						}else{
							$("<div>"+res.msg+"</div>").css({
								"position":"absolute",
								"top":"-28px",
								"left":"20px",
								"width":"240px",
								"height":"28px",
								"lineHeight":"28px",
								"color":"red"
							}).appendTo($("#reservationModal .sumbitBox button")).animate({
								"opacity":"0"
							},3000)
						}
					});
				}
			};
		};
	})();
	(function(){//登录注册弹窗功能
		$scope.loginTabStyle={
			"color": "#e4883d",
			"border-bottom": "2px solid #e4883d"
		};
		$scope.loginTab=function(){
			angular.element("#reservationModal").removeClass("hide");
			angular.element("#login").removeClass("hide");
			$scope.flag1=false;
			$scope.flag2=true;
			$scope.loginOff=false;
			$scope.loginTabStyle={
				"color": "#e4883d",
				"border-bottom": "2px solid #e4883d"
			};
			$scope.registerTabStyle="";
		};
		$scope.registerTab=function(){//弹出注册框
			angular.element("#reservationModal").removeClass("hide");
			angular.element("#login").removeClass("hide");
			$rootScope.getRegisterVal();
			$scope.flag1=true;
			$scope.flag2=false;
			$scope.loginOff=false;
			$scope.registerTabStyle={
				"color": "#e4883d",
				"border-bottom": "2px solid #e4883d"
			};
			$scope.loginTabStyle="";
			
		};
		$scope.loginOut=function(){//点击关闭重置所有不符合要求的错误提示
			$scope.loginOff=true;
			$scope.input3=false;
			$scope.loginTelErr=true;
			$scope.input4=false;
			$scope.loginPwdErr=true;
			$scope.input5=false;
			$scope.registerTelErr=true;
			$scope.input6=false;
			$scope.registerValErr=true;
			$scope.input7=false;
			$scope.registerPhoneCodeErr=true;
			$scope.input8=false;
			$scope.registerPwdErr=true;
			$scope.input9=false;
			$scope.registerRepwdErr=true;
			//重置所有的输入框内容
			$scope.registerTel="";
			$scope.registerVal="";
			$scope.registerPhoneCode="";
			$scope.registerPwd="";
			$scope.registerRepwd="";
			$scope.loginTel="";
			$scope.loginPwd="";
		};
	})();
	(function(){//用户登录验证功能
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
				$http.jsonp(requireData.requireUrl.login($scope.loginTel,$scope.loginPwd),{params:{"callback":"JSON_CALLBACK"}}).success(function(res){
					console.log(res);
					if(res.code==1){
						if($scope.rememberChecked){//选择记住密码功能
							localStorage.setItem("userName",$scope.loginTel);
							$scope.loginOff=true;
							$scope.sunUrl=localStorage.getItem("userName")==null?"module/template/sun1.html":"module/template/sun2.html";
							console.log($scope.sunUrl);
							location.reload();
						}else{
							sessionStorage.setItem("userName",$scope.loginTel);
							$scope.loginOff=true;
							$scope.sunUrl=sessionStorage.getItem("userName")==null?"module/template/sun1.html":"module/template/sun2.html";
							location.reload();
						}
					}else{
						$("<div class='loginErr'></div>").appendTo($("#login form:eq(0) button")).text(res.message).animate({
							"opacity":0,
						},3000);
					}
				})
			}
		};
	})();
	(function(){//用户注册验证功能
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
				$http.jsonp(requireData.requireUrl.register($scope.registerTel,$scope.registerVal,$scope.registerPhoneCode,$scope.registerPwd),{params:{"callback":"JSON_CALLBACK"}}).success(function(res){
					if(res.code=="1"){
						localStorage.setItem("userName",$scope.registerTel);
						location.href="index.html";
					}else if(res.code==-1){
						$("<div>"+res.message+"</div>").appendTo($("#login form:eq(1) button")).css({
							"position":"absolute",
							"top":"-28px",
							"height":"28px",
							"lineHeight":"28px",
							"left":"120px",
							"color":"red",
							"fontSize":"14px",
							"font-weight":"bolder",
							"border":"1px solid #eee"
						}).animate({
							"opacity":0
						},3000);
					}
				})
			}
		}
	})();
}]);
myApp.controller("reservationFixedCtrl",["$scope","requireData",function($scope,requireData){
	$scope.reservationFixedTabOut=function(){//底部预约模块,点击出现模块二
		$scope.reservationFixed1=true;
		$scope.reservationFixed2=false;
	};
	$scope.reservationFixedTabOff=function(){//底部预约模块,点击出现模块一
		$scope.reservationFixed1=false;
		$scope.reservationFixed2=true;
	};
	(function(){//详情页预约功能
		$scope.reservationBtnDetail=function(item,proType){
			console.log($scope.reservationName);
			console.log($scope.reservationTel);
			var nameReg=/^[\u4E00-\u9FA5|a-z|A-Z]{2,20}$/;//中英文匹配正则表达式，最多20位
			var telReg=/^1[34578][0-9]{9}$/;//匹配手机号正则表达式，开头为1第二位数是34578中一个，最后9位为数字
			var nameResult=nameReg.test($scope.reservationName);
			var telResult=telReg.test($scope.reservationTel);
			if(!nameResult||$scope.reservationName==null){
				$(".reservation-fixed-wrap .inputs-group input:eq(0)").css({
					"border":"2px solid red",
				});
			}else{
				$(".reservation-fixed-wrap .inputs-group input:eq(0)").css({
					"border":"0",
				});
			}
			if(!telResult||$scope.reservationTel==null){
				$(".reservation-fixed-wrap .inputs-group input:eq(1)").css({
					"border":"2px solid red",
				});
			}else{
				$(".reservation-fixed-wrap .inputs-group input:eq(1)").css({
					"border":"0",
				});
			}
			if(nameResult&&telResult&&$scope.reservationName!=null&&$scope.reservationTel!=null){//用户姓名和手机皆有效执行
				requireData.requireUrl.reservation({
					"reservation_pro_id":item.id,
					"product_type":proType,
					"name":$scope.reservationName,
					"phone":$scope.reservationTel
				},function(res){
					if(res.code==1){
						$("#reservationModal").removeClass("ng-hide");
						//预约成功提示
						$(".successReservation").removeClass("hide");
						$(".successReservation").prev("div").addClass("hide");
						//预约成功确定按钮
						$(".successReservation .sumbitBox button").click(function(){
							$(".successReservation").addClass("hide");
							$("#reservationModal").addClass("ng-hide");
						});
					}else{//预约重复失败的情况
						$("<div>"+res.msg+"</div>").appendTo($(".reservation-fixed-wrap .inputs-group a")).css({
							"position":"absolute",
							"bottom":"-36px",
							"left":"0",
							"width":"100%",
							"height":"100%",
							"lineHeight":"28px",
							"color":"red",
							"fontSize":"14px",
							"border":"1px solid red",
							"textAlign":"center"
						}).animate({
							"opacity":"0"
						},3000);
					}
				});
			}
		};
	})();
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
//	var baseUrl="http://172.16.1.234/site/api/";//（李小龙）
	var baseUrl="http://admin.qianhtj.com/site/api/";//云服务器地址//120.76.210.16
//	var baseUrl="http://172.16.1.208/site/api/";//登录注册请求地址（黄冬燕）
//	var baseUrl="http://172.16.1.133:8080/site/api/";//预约请求地址（李亚峰）
	this.baseUrl=baseUrl;
	this.requireUrl={//封装URL请求地址
		"newsType":function(newsType){//封装获取不同资讯类型的请求地址
			return baseUrl+"news/list.g?newsType="+newsType;
		},
		"newsDetail":function(newsId){//封装获取特定ID的资讯详情的请求地址
			return baseUrl+"news/show.g?id="+newsId;
		},
		"register":function (tel,captcha,telCode,loginPwd){//用户注册
			return baseUrl+"user/customer/saveCustomerAdd.g?phone="+tel+"&captcha="+captcha+"&phoneCode="+telCode+"&loginPwd="+loginPwd;
		},
		"login":function(tel,pwd){//用户登录
			return baseUrl+"user/customer/login.g?phone="+tel+"&loginPwd="+pwd;
		},
		"registerVal":function(){
			return baseUrl+"user/customer/captcha.g";
		},
		"phoneCode":function(tel,val){
			return baseUrl+"user/customer/getSms.g?phone="+tel+"&captcha="+val+"&type=001";
		},
		"reservation":function(params,callback){
			return $.ajax({
				url: baseUrl+"user/reservation/add.g",
				type: "POST",
				data: params,
				success:callback,
				dataType:"JSON"
			});
		},
		"GetTrustProduct":function(){
			return baseUrl+"product/trustCapital/list.g";
		},
		"getTrustProductFilter":function(params,callback){
			return $.ajax({
				url: baseUrl+"product/trustCapital/list.g",
				type: "POST",
				data: params,
				success:callback,
				dataType:"JSON"
			});
		},
		"getTrustProDetail":function(proId){
			return baseUrl+"product/trustCapital/show.g?id="+proId;
		},
		"getTrustCompanyFilter":function(sel1,sel2,sel3,sel4){
			return baseUrl+"product/trustCompanyinfo/list.g?page=1&registered_capital_cate="+sel1+"&shareholder_background="+sel2+"&register_address_range="+sel3+"&keyword="+sel4;
		},
		"GetPrivateProductFilter":function(sel1,sel2,sel3,name){
			return baseUrl+"privatefund/ajaxPage.g?fund_type="+sel1+"&fund_status="+sel2+"&investment_range="+sel3+"&name="+name;
		},
		"getTrustCompanyFilter":function(sel1,sel2,sel3,sel4){
			return baseUrl+"product/trustCompanyinfo/list.g?page=1&registered_capital_cate="+sel1+"&shareholder_background="+sel2+"&register_address_range="+sel3+"&keyword="+sel4;
		},
		"getTrustCompanyFilter":function(params,callback){
			return $.ajax({
				url: baseUrl+"product/trustCompanyinfo/list.g",
				type: "POST",
				data: params,
				success:callback,
				dataType:"JSON"
			});
		},
		"getPrivateFundFilter":function(params,callback){
			return $.ajax({
				url: baseUrl+"privatefund/ajaxPage.g",
				type: "POST",
				data: params,
				success:callback,
				dataType:"JSON"
			});
		},
		"getPrivateFundDetail":function(comId){
			return baseUrl+"product/trustCompanyinfo/show.g?id="+comId;
		},
		"getTrustComDetail":function(comId){
			return baseUrl+"product/trustCompanyinfo/show.g?id="+comId;
		},
		"GetPrivateProductFilter":function(params,callback){
	        return $.ajax({
	        	url: baseUrl+"privatefund/ajaxPage.g",
				type: "POST",
				data: params,
				success:callback,
				dataType:"JSON"
			});
		},
		"getPrivateFundFilter":function(params,callback){
			return $.ajax({
				url: baseUrl+"privatefund/ajaxPage.g",
				type: "POST",
				data: params,
				success:callback,
				dataType:"JSON"
			});
		},
		"getPrivateFundDetail":function(comId){
			return baseUrl+"privatefund/getDetail.g?id="+comId;
		},
		"homePrivatePro":function(rows){
			return baseUrl+"privatefund/ajaxPage.g?rows="+rows+"&sortBy=updateTime&isTop=2";
		},
		"homeSun":function(rows){//首页阳光私募模块
			return baseUrl+"sunshine/index.g?rows="+rows;
		}
	};
	this.Url={
		"list":function(){//私募首页、私募产品接口数据
			return baseUrl+"sunshine/list.g"
		},
		"sunCompany":function(){//私募公司
			return baseUrl+"suncompany/list.g"
		},
		"sunCompanyDetail":function(){//私募公司详情
			return baseUrl+"suncompany/show.g"
		},
		"sunCompanyDetailIncome":function(){
			return baseUrl+"sunshine/fundran.g"
		},
		"getPrivateCompany":function(params,callback){//私募公司分页要调用请求的ajax
			return $.ajax({
				url:baseUrl+"suncompany/list.g",
				type: "POST",
				data: params,
				success:callback,
				dataType:"JSON"
			});
		},
		"checkQuestionnaire":function(){
			return baseUrl+"user/result/checkDo.g"
		},
		"getCode":function(){
			return baseUrl+"user/result/getSmsQr.g?type=004"
		},
		"sendCode":function(){
			return baseUrl+"user/result/checkCode.g"
		}
		
	};
	this.creatPage=function(totalPage,totalRecords,pagerId,callback,bool){//生成分页服务
	    //有些参数是可选的，比如lang，若不传有默认值
	    kkpager.generPageHtml({
	    	pagerid:pagerId,//需要初始化的分页器id
	        pno :"1",
			//总页码
			total : totalPage,
			isGoPage:false,
			//总数据条数
			totalRecords : totalRecords,
	        mode : 'click',//默认值是link，可选link或者click
	        click : callback
	    },bool);
	};
}]);
