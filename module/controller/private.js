var privateCtrl=angular.module("myApp.private",["ui.router"]);
//privateCtrl.controller("privateCtrl",["$scope","$http",function($scope,$http){
privateCtrl.controller("privateCtrl",["$scope","$http","$rootScope","requireData","$state",function($scope,$http,$rootScope,requireData,$state){
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
	
	
	
	getPrivateFundFilter({
			"rows":"6",
			"sortBy":"updateTime",
			"isTop":1
			
		});
	
	
	function getPrivateFundFilter(params){
		requireData.requireUrl.getPrivateFundFilter(params,function(res){
			if(0==res.code){
			var priorPrivatefunds=res.rows;
			var size=priorPrivatefunds.length;
			
			for(var i=0;i<priorPrivatefunds.length;i++){
				var product_review=priorPrivatefunds[i].product_review;
				if(product_review.length>37){
					priorPrivatefunds[i].product_review=product_review.substring(0,37)+"..";
				}
               
		    }
			$scope.priorPrivatefunds3=priorPrivatefunds.slice(0,3);
		    $scope.priorPrivatefunds6=priorPrivatefunds.slice(3,6);
		
			
		}
			
		});
	}
	
	$http.get(requireData.requireUrl.newsType(2)).success(function(res){
		
		if(0!=res.code){
			return;
		}
		var news=res.rows;
		
		var today = new Date();
		for(var i=0;i<news.length;i++){
				var updateTime=news[i].updateTime;
               
		}
		$scope.newLatest3=news.slice(0,3);
		$scope.newLatest6=news.slice(3,9);
	});
	
	(function(){//页面跳转传参函数
		$rootScope.goPrivatefundDetail=function(item){
			
			$state.go("private.productDetail",{"id":item.id});
		};
		
	})();
	
	
	
	
	
	
}]);


//产品详情
privateCtrl.controller("privateProductDetailCtrl",["$http","$scope","requireData","$stateParams",function($http,$scope,requireData,$stateParams){

	
	
	
	//
	$http.get(requireData.requireUrl.getPrivateFundDetail($stateParams.id)).success(function(res){
		if(1==res.code){
			var privatefundDetail=res.obj;
			
			//状态
			switch (privatefundDetail.fund_status){
					case 1:
					    privatefundDetail.fund_status_desc="募集中";
					
						break;
					case 2:
					    privatefundDetail.fund_status_desc="开放运行";
					
						break;
					case 3:
					    privatefundDetail.fund_status_desc="开放运行";
					
						break;
					case 4:
					    privatefundDetail.fund_status_desc="提前清算";
					
						break;
					case 5:
					    privatefundDetail.fund_status_desc="到期清算";
					
						break;
					case 6:
					    privatefundDetail.fund_status_desc="发行失败";
					
						break;
					case 7:
					    privatefundDetail.fund_status_desc="更换管理人";
					
						break;
					case -1:
					    privatefundDetail.fund_status_desc="其他";
					
						break;
					default:
						break;
				  }	
				  
				  //方向
			switch (privatefundDetail.investment_direction){
					case 1:
					    privatefundDetail.investment_direction_desc="股权投资";
					
						break;
					case 2:
					    privatefundDetail.investment_direction_desc="健康医疗";
					
						break;
					case 3:
					    privatefundDetail.investment_direction_desc="生物技术";
					
						break;
					case 4:
					    privatefundDetail.investment_direction_desc="TMT产业";
					
						break;
					
					default:
						break;
				  }	
			
				//类型
			switch (privatefundDetail.fund_type){
					case 1:
					    privatefundDetail.fund_type_desc="天使基金";
					
						break;
					case 2:
					    privatefundDetail.fund_type_desc="创业基金";
					
						break;
					case 3:
					    privatefundDetail.fund_type_desc="成长基金";
					
						break;
					case 4:
					    privatefundDetail.fund_type_desc="FOF基金";
					
						break;
					case 5:
					    privatefundDetail.fund_type_desc="并购基金";
					
						break;
					case 6:
					    privatefundDetail.fund_type_desc="政府引导基金";
					
						break;
					case 7:
					    privatefundDetail.fund_type_desc="基础设施基金";
					
						break;
					case 7:
					    privatefundDetail.fund_type_desc="房地产基金";
					
						break;
						
						
					case 0:
					    privatefundDetail.fund_type_desc="其他";
					
						break;
					default:
						break;
				  }	
				  
					  //资本类型
			switch (privatefundDetail.capital_type){
					case 1:
					    privatefundDetail.capital_type_desc="本土";
					
						break;
					case 2:
					    privatefundDetail.capital_type_desc="其他";
					
						break;
					
					
					default:
						break;
				  }	
			  
			//var positions=new Array();	
			
			var positions=[];	
			
			for(var i=1;i<=4;i++){
				
				if(null!=privatefundDetail["name"+i]){
					
					var positionEle={};
					positionEle.name=privatefundDetail["name"+i];
					positionEle.head_image_id=privatefundDetail["head_image_id"+i+"_link"];//"img/private/teamerSample.jpg";//privatefundDetail["head_image_id"+i+"_link"];   //"img/private/teamerSample.jpg";//privatefundDetail["head_image_id"+i];
					positionEle.position=privatefundDetail["position"+i];
					positionEle.profile=privatefundDetail["profile"+i];
				    positions.push(positionEle);
			    }
				
			}
			
			privatefundDetail.positions=positions;
			//console.log(privatefundDetail.positions);//把取出的值打印在控制台上
			
			$scope.privatefundDetail=privatefundDetail;
		}
		
		
	});
	
	//可能感兴趣的
	getPrivateFundFilter({
			"rows":"3"
		});
	
	
	function getPrivateFundFilter(params){
		
		
		requireData.requireUrl.getPrivateFundFilter(params,function(res){
			if(0==res.code){
			var interested=res.rows;
			
			for(var i=0;i<interested.length;i++){
				var product_review=interested[i].product_review;
				if(product_review.length>37){
					interested[i].product_review=product_review.substring(0,37)+"..";
				}
               
		    }
			$scope.interested=interested;
			
			
		}
			
		});
	}
	
	
}]);	

	
	//首页
privateCtrl.controller("privateHomeCtrl",["$scope","$http","requireData","$state",function($scope,$http,requireData,$state){
	var privateBannerSwiper = new Swiper('.privateBannerSwiper',{//初始化背景图切换
		autoplay : 3000,//可选选项，自动滑动
		loop : true,//可选选项，开启循环
		pagination : '.swiper-pagination',//显示分页器
		paginationClickable : true ,//点击分页器可以切换
		autoplayDisableOnInteraction : false,//用户滑动后可以继续轮播
        effect: 'fade'
	});//初始化背景图
	
	
	//可能感兴趣的
	getPrivateFundFilter({
			"rows":"13"
		});
	
	
	function getPrivateFundFilter(params){
		
		
		requireData.requireUrl.getPrivateFundFilter(params,function(res){
			if(res.code==1){
				$scope.priorPrivatefunds=data.rows;
			}
			
		});
	}
	
}]);

privateCtrl.controller("privateProCtrl",["$scope","$http","requireData","$state",function($scope,$http,requireData,$state){
	
	(function(){//筛选条件
		$http.get("data/private/fundType.js").success(function(res){
			$scope.fundType=res;
		});
		$http.get("data/private/fundStatus.js").success(function(res){
			$scope.fundStatus=res;
		});
		$http.get("data/private/investmentRange.js").success(function(res){
			$scope.investmentRange=res;
		});
	})();
	
	(function(){
		getPrivatePro(1,false);
		function getPrivatePro(n,bool){//封装请求信托产品列表传参和判断是否点击其他选项的功能函数
			
				var selectId1=$("#privateProduct .fundType .active").attr("selectId")==null?"":$("#privateProduct .fundType .active").attr("selectId");
				var selectId2=$("#privateProduct .fundStatus .active").attr("selectId")==null?"":$("#privateProduct .fundStatus .active").attr("selectId");
				var selectId3=$("#privateProduct .investmentRange .active").attr("selectId")==null?"":$("#privateProduct .investmentRange .active").attr("selectId");
				var name = $scope.name == null?"":$scope.name;

	//		return baseUrl+"privatefund/ajaxPage.g?fund_type="+sel1+"&fund_status="+sel2+"&investment_range="+sel3+"&name="+name;
			requireData.requireUrl.GetPrivateProductFilter({
			"fund_type":selectId1,
			"fund_status":selectId2,
			"investment_range":selectId3,
			"name":name,
			"page":n,
			"rows":"13"
		},function(res){
			$scope.privateProduct13=res.rows;
			$scope.privateProSum=res.total;
			res.totalPages = res.total%13==0?res.total/13:parseInt(res.total/13)+1 ;
			requireData.creatPage(res.totalPages,res.totals,"privateProPager",function(n){// do something
			            //手动选中按钮
			            if(n!=1)
			              bool = false;
			            getPrivatePro(n,bool);
			            this.selectPage(n);
			            return false;
			        },bool);
		  });
		}
		$scope.privateSearchPro=function(){
			$("#privateProduct .fundType .divTab").removeClass("active").eq(0).addClass("active");
			$("#privateProduct .fundStatus .divTab").removeClass("active").eq(0).addClass("active");
			$("#privateProduct .investmentRange  .divTab").removeClass("active").eq(0).addClass("active");
			getPrivatePro(1,false);
		}
		//绑定点击改变类名事件
		$(document).on("click","#privateProduct .fundType .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getPrivatePro(1,true);
		});
		$(document).on("click","#privateProduct .fundStatus .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getPrivatePro(1,true);
		});
		$(document).on("click","#privateProduct .investmentRange .divTab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			getPrivatePro(1,true);
		});
		
	})()	
	
}]);




