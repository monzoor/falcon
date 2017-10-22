(function ($) {
    // Search select option auto resizer

    $(document).ready(function () {
        $('.flexslider').flexslider({
            animation: "slide",
            animationLoop: true,
            slideshow: false,
            itemWidth: 200,
            itemMargin: 10,
            minItems: 2,
            maxItems: 5
        });
        $(".home-slider").flexslider({
            animation:'slide',
            controlNav: false
        });
    });

    var $parentCat = $('#parentCat ul');
    if($parentCat.find('li').hasClass('active')){
        var $currentCatDataId = $parentCat.find('.active').data('menu');
        $('#'+$currentCatDataId).removeClass('div-hide');
    }
    var delay = 50, setTimeoutConst,
        delay2 = 500, setTimeoutConst2;

    var $parentCat = $("#parentCat ul li");

    $parentCat.bind('mouseover', function(){
        var $this = $(this);
        setTimeoutConst = setTimeout(function(){
            $parentCat.removeClass('active');
            $this.addClass('active');
            var $catDataId = '#'+$this.data('menu');
            $('.child-cat').hide();
            $($catDataId).fadeIn();
        },delay);
    })

    $("#parentCat ul li").bind('mouseout',function(e){
        clearTimeout(setTimeoutConst);
        setTimeoutConst2 = setTimeout(function(){
            // will use this later
            var isHover = !!$(".child-cat").find(":hover").length;
            if(isHover !== true){
                // console.log('hide');
            }
        },delay2);
    });

})(window.jQuery);
