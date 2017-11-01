
(function ($) {
    var verticalCarousel = {
        // log: false,
        fx: "carousel",
        carouselVertical: true,
        carouselVisible: 4,
        allowWrap: false,
        timeout: 0,
        next: "#next4",
        prev: "#prev4",
        // pager: "#pager4",
        // slides: "> div"
    }

    var horizontalCarousel = {
        // log: false,
        fx: "carousel",
        carouselVertical: false,
        carouselVisible: 4,
        allowWrap: false,
        timeout: 0,
        swipe: true,
        next: "#next4",
        prev: "#prev4",
        pager: "#pager4",
        carouselFluid: true,
        autoHeight: "3:1",
        // slides: "> div"
    }



    var responsiveThumbSlider = function (winSize,isMobile) {
        if(isMobile) {
            $('.main-slider-wrapper').addClass('div-center');
            $('.slideshow').cycle('destroy');
            $(".slideshow").cycle(horizontalCarousel);
            return;
        }
        $('.main-slider-wrapper').removeClass('div-center');
        $('.slideshow').cycle('destroy');
        $(".slideshow").cycle(verticalCarousel)
    }


    var getWindowWidth = function () {
        return $(window).innerWidth();
    }

    var isMobile = function (){
        return (getWindowWidth()< 992)?true:false;
    }
    var initSlider = function (){
        responsiveThumbSlider(getWindowWidth(),isMobile());
    }

    var resizer =  function () {
        var resize = false;
        var cachedWidth = $(window).width();
        $(window).resize(function(){
            var newWidth = $(window).width();
            if(newWidth !== cachedWidth){
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function() {
                    responsiveThumbSlider(getWindowWidth(),isMobile());
                }, 400);
                cachedWidth = newWidth;
            }
        });
    }


    var responsiveSlider = function (){
        initSlider();
        resizer();
    }()







    // $(".slideshow").cycle(horizontalCarousel)
    $(".cycle-carousel-wrap img").each(function (i){
        // console.log('jh',i);
        var imgSrc = $(this).data('image');
        var imgTag = '<div class="main-img-wrapper" data-thumbid="'+i+'"><img src="'+imgSrc+'"></div>'
        // var imgTag = '<img src="'+imgSrc+'">'
        $('.main-img').append(imgTag);
    })
    $(".main-img").cycle({
        log: false,
        fx: "scrollHorz",
        allowWrap: false,
        timeout: 0,
        swipe: true,
        prev: "#prev1",
        next: "#next1",
        slides: "> div",
        autoHeight: "10:13",
    })
    $(".cycle-carousel-wrap img").on('click', function (e) {
        // console.log('okk',$(this).data('id'));
        $(".cycle-carousel-wrap img").removeClass('selected');
        $(this).addClass('selected');
        // $('.slideshow').data("cycle.opts").currSlide
        // console.log($('.slideshow').data("cycle.opts").currSlide);
        $('.main-img').cycle('goto', $(this).data('id'));
    })

    // $('#next1, #prev1').on('click', function (){
    //     // console.log($('.main-img-wrapper').data('thumbid'));
    //     $('.slideshow').cycle('goto', $('.main-img .cycle-slide-active').data('thumbid'));
    //     $(".cycle-carousel-wrap img").removeClass('selected');
    //     if($('.slideshow img').hasClass('cycle-slide-active')) {
    //         $('.cycle-slide-active').addClass('selected')
    //     }
    //
    //
    // })

    // var ts;
    // $(document).bind('touchstart', function (e){
    //    ts = e.originalEvent.touches[0].clientY;
    // });
    //
    // $(document).bind('touchend', function (e){
    //    var te = e.originalEvent.changedTouches[0].clientY;
    //    if(ts > te+5){
    //
    //     //   slide_down();
    //       $('.slideshow').cycle('next');
    //    }else if(ts < te-5){
    //     //   slide_up();
    //       $('.slideshow').cycle('prev');
    //    }
    // });

})(window.jQuery);
