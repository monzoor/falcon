
(function ($) {
    $(document).ready(function () {
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
        var mainSlider = {
            log: false,
            fx: "scrollHorz",
            allowWrap: false,
            timeout: 0,
            swipe: true,
            prev: "#prev1",
            next: "#next1",
            slides: "> div",
            autoHeight: "10:13",
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

        var mainSliderCreator =  function () {
            $(".cycle-carousel-wrap img").each(function (i){
                var imgSrc = $(this).data('image');
                var imgTag = '<div class="main-img-wrapper" data-thumbid="'+i+'"><img src="'+imgSrc+'"></div>'
                $('.main-img').append(imgTag);
            })
        }

        var mainSliderInit =  function () {
            $(".main-img").cycle(mainSlider);
        }

        var thumbSelection = function () {
            $(".cycle-carousel-wrap img").on('click', function (e) {
                $(".cycle-carousel-wrap img").removeClass('selected');
                $(this).addClass('selected');
                $('.main-img').cycle('goto', $(this).data('id'));
            })
        }

        var responsiveSlider = function (){
            initSlider();
            resizer();
            mainSliderCreator();
            mainSliderInit();
            thumbSelection();
        }();

    })



})(window.jQuery);
