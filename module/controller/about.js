$(function(){
	
//	 var arr=['.tianji','.contect','.join','.media','.disclaimer'];
//	
//		$('.headline1').on('click',function(){
//	
//			var index=$(this).index();
//			$(this).addClass('active').siblings().removeClass('active');
//			console.log(index);
//			$(arr[index]).css('display','block').siblings().css('display','none')
//		});
		if(localStorage.getItem("userName")!=null){//判断用户是否登录
			$("#homeHeader2 .login .unloginBtn").addClass("hide").siblings().removeClass("hide");
			$("#homeHeader2 .userWP span").eq(1).text(localStorage.getItem("userName"));
		}else{
			$("#homeHeader2 .login .unloginBtn").removeClass("hide").siblings().addClass("hide");
		};
		var flag=true;
		$('.joinUl li').on('click',function(){
			if(flag==true){
				$(this).next('.require').css('display','block');
				$(this).children("span").text('-');
				
			}else{
				$(this).next('.require').css('display','none');
				$(this).children("span").text('+');
			}
			flag=!flag;
		});
		
		
	$(document).on("scroll",function(){//判断滚动事件
		if($(document).scrollTop()>120){
			$("#head2").removeClass('hide');
		}else{
			$("#head2").addClass('hide');
		}
	});
	
	
})