(function ($) {
    var createBgImg = function (){
        var bg = $('.thumb li.selected img').data('bg');
        var atl = $('.thumb li.selected img').data('alt');
        var img = '<img src="'+bg+'" atl="'+atl+'">'
        $('.content-img').html(img);
    }
    $('.thumb li img').on('click', function (e){
        e.preventDefault();
        $('.thumb li').removeClass('selected')
        $(this).parent().addClass('selected');
        createBgImg();
    });
    if($('.thumb li').hasClass('selected')){
        createBgImg();
    }
})(window.jQuery);
