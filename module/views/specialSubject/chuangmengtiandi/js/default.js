$(function(){
	
	$(document).ready(function(e){
	  var opt	=	{
		"speed"	:	"fast"		,	//变换速度,三速度可选 slow,normal,fast;
		"by"	:	"mouseover"		,	//触发事件,click或者mouseover;
		"auto"	:	true		,	//是否自动播放;
		"sec"	:	3000	 		//自动播放间隔;
	  };
//    $("#demo").IMGDEMO(opt);   
      
	});
	
	
	$(document).on("scroll",function(){//判断滚动事件
		if($(document).scrollTop()>120){
			$("#head2").removeClass('hide');
		}else{
			$("#head2").addClass('hide');
		}
	});
	
})