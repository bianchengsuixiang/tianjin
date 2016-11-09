var sun=angular.module("myApp.sun",["ui.router"]);
sun.controller("sunCtrl",["$scope","$http","$rootScope","requireData","$state",function($scope,$http,$rootScope,requireData,$state){
	if(localStorage.getItem("userName")!=null){//判断用户是否登录
		$("#tophead .login_wrap .unloginBtn").addClass("hide").siblings().removeClass("hide");
		$scope.userName=localStorage.getItem("userName");
	}else{
		$("#tophead .login_wrap .unloginBtn").removeClass("hide").siblings().addClass("hide");
	};
	$(document).on("click","#head .nav-right a",function(){
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
	
	$scope.sunUrl=localStorage.getItem("users")==null?"module/template/sun1.html":"module/template/sun2.html";//"html/sun1.html"
	$http.get("data/sunProducts.js").success(function(res){
		$scope.sunProducts=res;
	});
}]);
sun.controller("sunHomeCtrl",["$http","$scope","requireData","$stateParams","$state",function($http,$scope,requireData,$stateParams,$state){
	var sunBannerSwiper = new Swiper('.sunBannerSwiper',{//初始化背景图切换
		autoplay : 3000,//可选选项，自动滑动
		loop : true,//可选选项，开启循环
		pagination : '.swiper-pagination',//显示分页器
		paginationClickable : true ,//点击分页器可以切换
		autoplayDisableOnInteraction : false,//用户滑动后可以继续轮播
        effect: 'fade'
	});//初始化背景图
	
	$scope.sunHome=function(){
		$state.go("sun.home")
	}
	$http({//私募首页要显示的数据,按默认的
			url:requireData.Url.list(),
			method:'GET',
			params:{"rows":10}
		}).success(function(data){
			if(data.code==1){
					$scope.sunHome=data.rows;
			}
		});
		
	//合格投资者认定
	var phoneNumber=parseInt($(".phone input").val()) 
	//var reg=/1[3,4,5,7,8][0-9]{9}/
	//reg.test(phoneNumber)
	
	if(phoneNumber!=null){
		$(".Code button").click(function(){
			 localStorage.setItem("phone",phoneNumber);
			 $(".Code button").css("background","#999");
				$.ajax({//向后台发送手机号码,索取验证码
					url:requireData.Url.getCode(),
					type:'GET',
					dataType:"jsonp",
		       		jsonp:"callback",
		       		data:{"phone":phoneNumber},
					success:function(data){
						console.log(data)
					}
				})
				
				
				
        
          
          
				 
				var code=parseInt($(".Code input").val()) //获取用户输入的验证码
				if(code){
					if($(".radio input")[0].checked){//用户必须点击我已阅读并符合合格投资者认定才能点击提交按钮操作
				 	   //点击提交按钮向后台发送用户输入的验证码
					 	$(".sumbitBox").click(function(){
					 		alert("qqqqq")
							var phoneNumber	=localStorage.getItem("phone")
							$.ajax({ //将用户输入的验证码发送给后台进行验证      
				   				 url:requireData.Url.sendCode(),
				    			 type: 'GET',
				   				 dataType:"jsonp",
				       			 jsonp:"jsonpcallback",
				                 data:{"code":code,"phone":phoneNumber} ,
							    success:function(data){
							       if(data.code==1){//如果验证成功发送回来的状态码为1说明用户没有做过问卷调查，必须做问卷调查
//										$(".sumbitBox.disable").prev(".sumbitBox").removeClass("hide")
//										$(".sumbitBox.disable").addClass("hide")
										location.href='http://www.qianhtj.com/#/userSearch'
								    }
							 
							        if(data.code==2){//如果返回的状态码为2说明用户之前做过问卷调查，就不需要再去做问卷调查了
										$(".sumbitBox.disable").css("background","rgb(228,136,61)")
										$(".z-Qualified").hide()
											
										
									  
							        }
							    }	   
						    })
								
						})
				 	
				 	}
				}
		  
	    })
	
    }
	
	
			
	//userSearch.js文件，问卷调查接口成功之后隐藏此弹窗DIV,可以继续浏览阳光私募下的页面信息
		if(window.name==1){
			$(".z-Qualified").hide();
			
		}
		
}]);
sun.controller("funderCtrl",["$scope","$http","requireData",function($scope,$http,requireData){
	$(document).on("click",".funderManager .manager",function(){//为基金经理当前点击DOM添加active类
		$(".funderManager .manager").removeClass("active");
		$(this).addClass("active");
	});
	$http({
			url:requireData.Url.list(),//私募产品默认要显示的数据
			method:'GET',
			params:{"rows":13}
		}).success(function(data){
			if(data.code==1){
				$scope.sumProducts=data.rows;
			}
		});
	$scope.managerTab=function(item){//私募产品页，点击筛选按钮要显示的数据
		if(item){//如果对象存在就传对象的id给后台，后台返回与之相关的数据
			//console.log(item.id)
			$http({
				url:requireData.Url.list(),
				method:'GET',
				params:{"fundManagerId":item.id,"advisorId":item.id,"strategy":item.id}
			}).success(function(data){
				if(data.code==1){
					$scope.PrivateProducts=data.rows;
				}
			})	
		}else{	//如果对象不存在就显示默认的数据也就是按全部来显示
			$http({
			url:requireData.Url.list(),
			method:'GET',
			params:{"rows":13}
		}).success(function(data){
			if(data.code==1){
					$scope.PrivateProducts=data.rows;
			  }
			})	
			
		}
	}	
		
	$(document).on("click",".funderCompany .company",function(){//为基金公司当前点击DOM添加active类
		$(".funderCompany .company").removeClass("active");
		$(this).addClass("active");
	});
	$(document).on("click",".investPattern .pattern",function(){//为投资策略当前点击DOM添加active类
		$(".investPattern .pattern").removeClass("active");
		$(this).addClass("active");
	});
	$(document).on("click",".isGrading .grading",function(){//为分级当前点击DOM添加active类
		$(".isGrading .grading").removeClass("active");
		$(this).addClass("active");
	});
	$scope.moreOff1=false;
	$scope.foldOn1=true;
	$scope.moreHide1=true;
	$scope.moreTab1=function(){
		$scope.moreOff1=true;
		$scope.foldOn1=false;
		$scope.moreHide1=false;
	};
	$scope.foldTab1=function(){
		$scope.moreOff1=false;
		$scope.foldOn1=true;
		$scope.moreHide1=true;
	};
	$scope.moreOff2=false;
	$scope.foldOn2=true;
	$scope.moreHide2=true;
	$scope.moreTab2=function(){
		$scope.moreOff2=true;
		$scope.foldOn2=false;
		$scope.moreHide2=false;
	};
	$scope.foldTab2=function(){
		$scope.moreOff2=false;
		$scope.foldOn2=true;
		$scope.moreHide2=true;
	};
	$scope.moreOff3=false;
	$scope.foldOn3=true;
	$scope.moreHide3=true;
	$scope.moreTab3=function(){
		$scope.moreOff3=true;
		$scope.foldOn3=false;
		$scope.moreHide3=false;
	};
	$scope.foldTab3=function(){
		$scope.moreOff3=false;
		$scope.foldOn3=true;
		$scope.moreHide3=true;
	};
	$http.get("data/funderManager.js").success(function(res){
		$scope.funderManager=res.slice(0,6);
		$scope.funderManagers=res.slice(6);
	});
	$http.get("data/funderCompany.js").success(function(res){
		$scope.funderCompany=res.slice(0,6);
		$scope.funderCompanys=res.slice(6);
	});
	$http.get("data/pattern.js").success(function(res){
		$scope.pattern=res.slice(0,6);
		$scope.patterns=res.slice(6);
	});
	$http.get("data/sunCompany.js").success(function(res){
		$scope.PrivateProducts=res;
	});
}]);

sun.controller("sunCompanyCtrl",["$scope","$state","$stateParams","requireData","$http",function($scope,$state,$stateParams,requireData,$http){
	$(document).on("click",".section-Y .funderManager .manager",function(){//为基金经理当前点击DOM添加active类
		$(".section-Y .funderManager .manager").removeClass("active");
		$(this).addClass("active");
	});
	$(document).on("click",".section-Y .funderCompany .company",function(){//为基金经理当前点击DOM添加active类
		$(".section-Y .funderCompany .company").removeClass("active");
		$(this).addClass("active");
	});
	$(document).on("click",".section-Y .investPattern .pattern",function(){//为基金经理当前点击DOM添加active类
		$(".section-Y .investPattern .pattern").removeClass("active");
		$(this).addClass("active");
	});
	$(document).on("click",".section-Y .isGrading .grading",function(){//为基金经理当前点击DOM添加active类
		$(".section-Y .isGrading .grading").removeClass("active");
		$(this).addClass("active");
	});
	$(document).on("click",".section-Y .Addres .grading",function(){//为基金经理当前点击DOM添加active类
		$(".section-Y .Addres .grading").removeClass("active");
		$(this).addClass("active");
	});
	
	
	$http.get("data/dates.js").success(function(res){
		$scope.dates=res;
	});
	$http.get("data/pattern.js").success(function(res){
		$scope.pattern=res.slice(0,6);
		$scope.patterns=res.slice(6);
	});
	
	$http({
		url:requireData.Url.sunCompany(),//私募公司接口数据
		method:'GET',
	    params:{"establishYear":2015,"rows":13}
	}).success(function(res){
		$scope.sumConpanyProducts =res.rows
		$scope.companyId=function(item){
			alert(item.companyId);
			$state.go("sun.companyDetails",{"companyId":item.companyId});
	}
		
	});
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
	
	$scope.moreOff3=false;
	$scope.foldOn3=true;
	$scope.moreHide3=true;
	$scope.moreTab3=function(){
		$scope.moreOff3=true;
		$scope.foldOn3=false;
		$scope.moreHide3=false;
	};
	$scope.foldTab3=function(){
		$scope.moreOff3=false;
		$scope.foldOn3=true;
		$scope.moreHide3=true;
	};
	
	$(document).on("click",".tabTitle li",function(){//阳光私募公司tab切换
		$(this).addClass("active").siblings().removeClass("active");
	});
	
	/*requireData.creatPage(10,100,"privateCompany",function(){
		console.log("1")
	})*/
	
/*	 getCompany(1,false);//私募公司分页调用函数
	function getCompany(n,bool){
			require.Url.getPrivateCompany({"rows":"13","page":n==null?"":n},function(res){
				$scope.sumConpanyProducts=res.rows;
				//$scope.trustProSum=res.total;
				requireData.creatPage(n,res.total,"privateCompany",function(n){// do something
		            //手动选中按钮
		            getCompany(n);
		            this.selectPage(n);
		            return false;
		        },bool);
	        });

	}*/

}]);

sun.controller("sunCompanyDetailCtrl",["$http","$scope","requireData","$stateParams",function($http,$scope,requireData,$stateParams){
		
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
	
	$scope.moreOff3=false;
	$scope.foldOn3=true;
	$scope.moreHide3=true;
	$scope.moreTab3=function(){
		$scope.moreOff3=true;
		$scope.foldOn3=false;
		$scope.moreHide3=false;
	};
	$scope.foldTab3=function(){
		$scope.moreOff3=false;
		$scope.foldOn3=true;
		$scope.moreHide3=true;
	};
	
	$(document).on("click",".tabTitle li",function(){//阳光私募公司tab切换
		$(this).addClass("active").siblings().removeClass("active");
	});
		//alert($stateParams.companyId)
		$http({
				url:requireData.Url.sunCompanyDetail(),//阳光私募公司详情接口数据
				method:'GET',
				params:{"id":$stateParams.companyId}
		}).success(function(data){
				      $scope.companyDetail=data.obj
			})	

		//	alert($stateParams)
			       //私募公司详情之基金收益及排名列表接口数据
	    $http({
	    	url:requireData.Url.sunCompanyDetailIncome(),
	    	method:'GET',
	    	params:{"id":"CO0000000G"}
	    	}).success(function(res){
//	    			$scope.income=res.obj
//	    			angular.forEach(res.obj, function(data,index,arrays){
//	    				console.log(arrays[0])
//				})
					    $scope.obj1=res.obj[0];
					    $scope.obj2=res.obj[1]
					    $scope.obj3=res.obj[2]
					    
	    })
	
}]);