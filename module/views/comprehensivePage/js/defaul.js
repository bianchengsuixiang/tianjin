$(function(){
	
	$('.product-section1-box').on('mouseover',function(){
		
	$(this).children('.product-section1-list1').css('background','#f4f4f4')
	})
	$('.product-section1-box').on('mouseout',function(){
		
		$('.product-section1-list1').css('background','#e9e9e9')
	})
	
	$('.product-section3-box').on('mouseover',function(){
		
	$(this).children('.product-section3-list1').css('background','#f4f4f4')
	})
	$('.product-section3-box').on('mouseout',function(){
		
		$('.product-section3-list1').css('background','#e9e9e9')
	})
	 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        effect: 'fade',
        autoplayDisableOnInteraction: false
    });
})