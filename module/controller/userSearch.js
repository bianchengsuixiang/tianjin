$(function(){
	document.title="私募投资者风险问卷调查";
	var val1=$('input[name="age"]:checked ').val();
	var val2=$('input[name="education"]:checked ').val();
	var val3=$('input[name="profession"]:checked ').val();
	var val4=$('input[name="income"]:checked ').val();
	var val5=$('input[name="invest"]:checked ').val();
	var val6=$('input[name="product"]:checked ').val();
	var val7=$('input[name="term"]:checked ').val();
	var val8=$('input[name="deadline"]:checked ').val();
	var val9=$('input[name="description"]:checked ').val();
	var val10=$('input[name="type"]:checked ').val();
	var val11=$('input[name="question"]:checked ').val();
	var val12=$('input[name="loss"]:checked ').val();
	var sum=parseInt(val1)+parseInt(val2)+parseInt(val3)+parseInt(val4)+parseInt(val5)+parseInt(val6)+parseInt(val7)+parseInt(val8)+
	parseInt(val9)+parseInt(val10)+parseInt(val11)+parseInt(val12);
	$('#btn').on('click',function(){
		
		$('#mask').css('display','block');
		var val1=$('input[name="age"]:checked ').val();
		var val2=$('input[name="education"]:checked ').val();
		var val3=$('input[name="profession"]:checked ').val();
		var val4=$('input[name="income"]:checked ').val();
		var val5=$('input[name="invest"]:checked ').val();
		var val6=$('input[name="product"]:checked ').val();
		var val7=$('input[name="term"]:checked ').val();
		var val8=$('input[name="deadline"]:checked ').val();
		var val9=$('input[name="description"]:checked ').val();
		var val10=$('input[name="type"]:checked ').val();
		var val11=$('input[name="question"]:checked ').val();
		var val12=$('input[name="loss"]:checked ').val();
		var sum=parseInt(val1)+parseInt(val2)+parseInt(val3)+parseInt(val4)+parseInt(val5)+parseInt(val6)+parseInt(val7)+parseInt(val8)+
		parseInt(val9)+parseInt(val10)+parseInt(val11)+parseInt(val12);
		console.log(sum);
		if(sum<=15){
			$('.result1').children().text('保守型');
			$('.result2').text('低风险产品');
		}
		if(sum>15&&sum<=35){
			$('.result1').children().text('稳健型');
			$('.result2').text('低、中低风险产品');
		}
		if(sum>35&&sum<=55){
			$('.result1').children().text('平衡型');
			$('.result2').text('低、中低、中等风险产品');
		}
		if(sum>55&&sum<=75){
			$('.result1').children().text('成长型');
			$('.result2').text('低、中低、中等、中高风险产品');
		}
		if(sum>75&&sum<=100){
			$('.result1').children().text('进取型');
			$('.result2').text('低、中低、中等、中高及高风险产品');
		}
	});
	
	$('.evaluation').on('click',function(){
		
		$('#mask').hide();
		$(this).css('background','#e4883d').css('color','#FFFFFF');
		$('.continue').css('background','white').css('color','#e4883d');
	});
	$(document).on("scroll",function(){//判断滚动事件
		if($(document).scrollTop()>120){
			$("#head2").removeClass('hide');
		}else{
			$("#head2").addClass('hide');
		}
	});

	if(localStorage.getItem("userName")!=null){//判断用户是否登录
		$("#tophead .login_wrap .unloginBtn").addClass("hide").siblings().removeClass("hide");
		$("#tophead .userWP span").eq(0).text(localStorage.getItem("userName"));
	}else{
		$("#tophead .login_wrap .unloginBtn").removeClass("hide").siblings().addClass("hide");
	};

	
		//点击提交按钮向后台提交数据
		$("#btn").click(function(){
		var ph=localStorage.getItem("phone");
		var str = val1+","+val2+","+val3+","+val4+","+val5+","+val6+","+val7+","+val8+","+val9+","+val10+","+val11+","+val2;
			
			$.ajax({          //问卷调查接口
   				 url:'http://172.16.1.208/site/api/user/result/resultAdd.g?type=004',
    			 type: 'GET',
   				 dataType:"jsonp",
       			 jsonp:"jsonpcallback",
                 data: {'answer':str,'grade':sum,'phone':ph},
			    success:function(data){
			       if(data.code==1){//如果后台返回成功相应状态的状态码1，则可以继续浏览阳光私募页面的产品
			       		$(".continueWP.disable").addClass("hide");
			       		$(".continueWP.disable").prev(".continueWP").removeClass("hide");
			       		
			       			//点击继续浏览按钮
							$(".continue").on('click',function(){
								//页面之间通信,在sun.js文件的sunHomeCtrl控制器里隐藏(.z-Qualified)这个类名的弹窗DIV
								window.name=1;
					       });
			       }
			    }	   
			})
			
		})
		
})