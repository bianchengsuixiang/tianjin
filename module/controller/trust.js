var trust=angular.module("myApp.trust",["ui.router","ngSanitize"]);
trust.controller("trustCtrl",["$scope","$http","$rootScope","requireData","$state",function($scope,$http,$rootScope,requireData,$state){
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
	(function(){//页面跳转传参函数
		$rootScope.goTrustProDetail=function(item){//跳转至产品详情页
			$state.go("trust.productDetail",{"proId":item.id});
		};
		$rootScope.goTrustComDetail=function(item){//跳转至公司详情页
			$state.go("trust.comDetails",{"comId":item.trust_company_id});
		};
	})();
}]);
trust.controller("trustHomeCtrl",["$scope","$http","requireData",function($scope,$http,requireData){
	var trustBannerSwiper = new Swiper('.trustBannerSwiper',{//初始化背景图切换
		autoplay : 3000,//可选选项，自动滑动
		loop : true,//可选选项，开启循环
		pagination : '.swiper-pagination',//显示分页器
		paginationClickable : true ,//点击分页器可以切换
		autoplayDisableOnInteraction : false,//用户滑动后可以继续轮播
//      effect: 'fade'
	});//初始化背景图
	(function(){//首页产品列表获取
		$http.get("data/trust/profitcate.js").success(function(res){
			$scope.profitCate=res;
		});
		requireData.requireUrl.getTrustProductFilter({"rows":10},function(res){
			angular.element(document).scrollTop(1);
			$scope.trustProduct10=res.obj;
		});
	})();
	(function(){
		$(document).on("click",".trustRankUl li a",function(){
			$(".trustRankUl li a").removeClass("active");
			$(this).addClass("active");
		});
	})();
	$scope.getProfitCate=function(item){
		$http.get(requireData.requireUrl.GetTrustProduct(),{params:{"profit_cate":item.profit_cate}}).success(function(res){
			angular.element(document).scrollTop(1);
			$scope.trustProduct10=res.obj;
		});
	};
}]);
trust.controller("trustProCtrl",["$scope","$http","requireData","$state",function($scope,$http,requireData,$state){
	(function(){//绑定信托产品列表页面的筛选条件
		$http.get("data/trust/point.js").success(function(res){
			$scope.investmentPoint=res;
		});
		$http.get("data/trust/expires.js").success(function(res){
			$scope.investmentExpires=res;
		});
		$http.get("data/trust/income.js").success(function(res){
			$scope.investmentIncome=res;
		});
		$http.get("data/trust/pattern.js").success(function(res){
			$scope.payPattern=res;
		});
		$http.get("data/trust/field.js").success(function(res){
			$scope.investmentField=res;
		});
		$http.get("data/trust/location.js").success(function(res){
			$scope.projectLocation=res;
		});
		$http.get("data/trust/trustCompany.js").success(function(res){
			$scope.trustCompany=res;
		});
	})();
	(function(){//绑定更多设置折叠功能
		$scope.moreTab=function(){
			$scope.moreSet=true;
			$scope.trustFilter=false;
		}
		$scope.moreTabOff=function(){
			$scope.moreSet=false;
			$scope.trustFilter=true;
		}
	})();
	(function(){//获取信托产品
		getTrustProduct(1,true);
		function getTrustProduct(n,bool){
			requireData.requireUrl.getTrustProductFilter({"rows":"13","page":n==null?"":n},function(res){
				angular.element(document).scrollTop(320);//数据返回后回到顶部
				$scope.trustProduct13=res.obj;
				$scope.trustProSum=res.totals;
				requireData.creatPage(res.totalPages,res.totals,"trustProPager",function(n){// do something
		            //手动选中按钮
		            getTrustProduct(n,false);
		            this.selectPage(n);
		            return false;
		        },bool);
			});
		}
		function getTrustPro(){//封装请求信托产品列表传参和判断是否点击其他选项的功能函数
			if($("#trustProduct .investmentIncome .active").text()=="全部"){//预期年化收益没有被选择的情况
				var selectId1=$("#trustProduct .investmentPoint .active").attr("selectId")==null?"":$("#trustProduct .investmentPoint .active").attr("selectId");
				var selectId2=$("#trustProduct .investmentExpires .active").attr("selectId")==null?"":$("#trustProduct .investmentExpires .active").attr("selectId");
				var selectId3="";
				var selectId4="";
				var selectId5=$("#trustProduct .payPattern .active").attr("selectId")==null?"":$("#trustProduct .payPattern .active").attr("selectId");
				var selectId6=$("#trustProduct .investmentField .active").attr("selectId")==null?"":$("#trustProduct .investmentField .active").attr("selectId");
				var selectId7=$("#trustProduct .projectLocation .active").attr("selectId")==null?"":$("#trustProduct .projectLocation .active").attr("selectId");
				var selectId8=$("#trustProduct .trustCompany .active").attr("selectId")==null?"":$("#trustProduct .trustCompany .active").attr("selectId");
			}else{//预期年化收益有被选择的情况
				var reg1=/[0-9]{1,}-/;
				var reg2=/-[0-9]{1,}/;
				var reg3=/\d+/;
				var selectId1=$("#trustProduct .investmentPoint .active").attr("selectId")==null?"":$("#trustProduct .investmentPoint .active").attr("selectId");
				var selectId2=$("#trustProduct .investmentExpires .active").attr("selectId")==null?"":$("#trustProduct .investmentExpires .active").attr("selectId");
				var selectId5=$("#trustProduct .payPattern .active").attr("selectId")==null?"":$("#trustProduct .payPattern .active").attr("selectId");
				var selectId6=$("#trustProduct .investmentField .active").attr("selectId")==null?"":$("#trustProduct .investmentField .active").attr("selectId");
				var selectId7=$("#trustProduct .projectLocation .active").attr("selectId")==null?"":$("#trustProduct .projectLocation .active").attr("selectId");
				var selectId8=$("#trustProduct .trustCompany .active").attr("selectId")==null?"":$("#trustProduct .trustCompany .active").attr("selectId");
				if($("#trustProduct .investmentIncome .active").text().indexOf("-")==-1){
					if($("#trustProduct .investmentIncome .active").text().indexOf("以上")==-1){
						var selectId3=0;
						var selectId4=parseInt($("#trustProduct .investmentIncome .active").text().match(reg3));
					}else{
						var selectId4="";
						var selectId3=parseInt($("#trustProduct .investmentIncome .active").text().match(reg3));
					}
				}else{
					var selectId3=(parseInt($("#trustProduct .investmentIncome .active").text().match(reg1))).toString();
					var selectId4=(parseInt($("#trustProduct .investmentIncome .active").text().match(reg2))).toString().replace("-","");
				}
			}
			requireData.requireUrl.getTrustProductFilter({
				"investment_range":selectId1,
				"term_of_investment_range":selectId2,
				"expect_annual_yield_start":selectId3,
				"expect_annual_yield_end":selectId4,
				"methods_of_bonds":selectId5,
				"investment_field":selectId6,
				"project_location":selectId7,
				"trust_company_id":selectId8,
				"rows":"13",
				"keyword":$scope.trustProKewords==null?"":$scope.trustProKewords},
				function(res){
					angular.element(document).scrollTop(320);//数据返回后回到顶部
					$scope.trustProduct13=res.obj;
					$scope.trustProSum=res.totals;
					requireData.creatPage(res.totalPages,res.totals,"trustProPager",function(n){// do something
			            //手动选中按钮
			            getTrustProduct(n,false);
			            this.selectPage(n);
			            return false;
			        },true);
				}
			);
		};
		$scope.trustSearchPro=function(){
			$("#trustProduct .investmentPoint .divTab").removeClass("active").eq(0).addClass("active");
			$("#trustProduct .investmentExpires .divTab").removeClass("active").eq(0).addClass("active");
			$("#trustProduct .investmentIncome .divTab").removeClass("active").eq(0).addClass("active");
			$("#trustProduct .payPattern .divTab").removeClass("active").eq(0).addClass("active");
			$("#trustProduct .investmentField .divTab").removeClass("active").eq(0).addClass("active");
			$("#trustProduct .projectLocation .divTab").removeClass("active").eq(0).addClass("active");
			$("#trustProduct .trustCompany .divTab").removeClass("active").eq(0).addClass("active");
			getTrustPro();
		}
		//绑定点击改变类名事件
		$(document).on("click","#trustProduct .investmentPoint .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustPro();
		});
		$(document).on("click","#trustProduct .investmentExpires .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustPro();
		});
		$(document).on("click","#trustProduct .investmentIncome .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustPro();
		});
		$(document).on("click","#trustProduct .payPattern .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustPro();
		});
		$(document).on("click","#trustProduct .investmentField .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustPro();
		});
		$(document).on("click","#trustProduct .projectLocation .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustPro();
		});
		$(document).on("click","#trustProduct .trustCompany .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustPro();
		});
	})();
}]);
trust.controller("trustProDetailCtrl",["$http","$scope","requireData","$stateParams",function($http,$scope,requireData,$stateParams){
	$http.get(requireData.requireUrl.getTrustProDetail($stateParams.proId)).success(function(res){
		$scope.trustProDetail=res.obj;
		$scope.accountInfo=res.obj.account_info;
		$scope.repaySource=res.obj.repay_source;
		$scope.riskControl=res.obj.risk_control;
		$scope.features=eval(res.obj.features);
	});
	requireData.requireUrl.getTrustProductFilter({"rows":"3"},function(res){
		$scope.trustProDetailsPro3=res.obj;
	});
}]);
trust.controller("trustComCtrl",["$scope","$http","requireData","$state",function($scope,$http,requireData,$state){
	$scope.goTrustComDetailCom=function(item){
		$state.go("trust.comDetails",{"comId":item.company_id});
	}
	function getTrustCompany(param1,param2,param3,keyword,page,bool){
		requireData.requireUrl.getTrustCompanyFilter({
			"registered_capital_cate":param1,
			"shareholder_background":param2,
			"register_address_range":param3,
			"keyword":keyword,
			"page":page,
			"rows":"10"
		},function(res){
			angular.element(document).scrollTop(320);//数据返回后回到顶部
			$scope.trustCompanys=res.obj;
			$scope.trustComSum=res.totals;
			requireData.creatPage(res.totalPages,res.totals,"trustComPager",function(n){// do something
			            //手动选中按钮
			            getTrustCompany(param1,param2,param3,keyword,n,false);
			            this.selectPage(n);
			            return false;
			        },bool);
		});
	}
	getTrustCompany("","","","","1",true);
	(function(){
		//绑定点击改变类名事件
		$(document).on("click","#trustCompany .capitalCate .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustCom();
		});
		$(document).on("click","#trustCompany .shareholderBackground .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustCom();
		});
		$(document).on("click","#trustCompany .registerAddress .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getTrustCom();
		});
		function getTrustCom(){//封装点击筛选条件执行的函数
			var param1=$("#trustCompany .capitalCate .active").attr("selectId")==null?"":$("#trustCompany .capitalCate .active").attr("selectId");
			var param2=$("#trustCompany .shareholderBackground .active").attr("selectId")==null?"":$("#trustCompany .shareholderBackground .active").attr("selectId");
			var param3=$("#trustCompany .registerAddress .active").attr("selectId")==null?"":$("#trustCompany .registerAddress .active").attr("selectId");
			var keyword=$scope.trustComKeword==null?"":$scope.trustComKeword;
			getTrustCompany(param1,param2,param3,keyword,"1",true);
		}
		$scope.trustComSearch=function(){//绑定信托公司页面搜索功能
			$("#trustCompany .capitalCate .divTab").removeClass("active").eq(0).addClass("active");
			$("#trustCompany .shareholderBackground .divTab").removeClass("active").eq(0).addClass("active");
			$("#trustCompany .registerAddress .divTab").removeClass("active").eq(0).addClass("active");
			getTrustCom();
		}
	})();
	(function(){//绑定信托公司页面的筛选条件
		$http.get("data/trust/capitalCate.js").success(function(res){
			$scope.capitalCate=res;
		});
		$http.get("data/trust/shareholderBackground.js").success(function(res){
			$scope.shareholderBackground=res;
		});
		$http.get("data/trust/registerAddress.js").success(function(res){
			$scope.registerAddress=res;
		});
	})();
}]);
trust.controller("trustComDetailCtrl",["$scope","$state","$stateParams","$http","requireData",function($scope,$state,$stateParams,$http,requireData){
	(function(){//tab切换功能函数
		$scope.sunCompany1=false;
		$scope.sunCompany2=true;
		$scope.sunCompany3=true;
		$scope.sunCompany4=true;
		$scope.sunCompanyTab1=function(){
			$scope.sunCompany1=false;
			$scope.sunCompany2=true;
			$scope.sunCompany3=true;
			$scope.sunCompany4=true;
		}
		$scope.sunCompanyTab2=function(){
			$scope.sunCompany1=true;
			$scope.sunCompany2=false;
			$scope.sunCompany3=true;
			$scope.sunCompany4=true;
		}
		$scope.sunCompanyTab3=function(){
			$scope.sunCompany1=true;
			$scope.sunCompany2=true;
			$scope.sunCompany3=false;
			$scope.sunCompany4=true;
		}
		$scope.sunCompanyTab4=function(){
			$scope.sunCompany1=true;
			$scope.sunCompany2=true;
			$scope.sunCompany3=true;
			$scope.sunCompany4=false;
		}
	})();
	$(document).on("click",".tabTitle li",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	(function(){//获取公司详情的信息
		$http.get(requireData.requireUrl.getTrustComDetail($stateParams.comId)).success(function(res){
			$scope.trustComDetail=res.obj;
			$scope.comDetailShareholder=JSON.parse(res.obj.shareholder.replace("/\"{/","").replace("/}\"/","")).shareholder[0].name;
		});
	})();
}]);