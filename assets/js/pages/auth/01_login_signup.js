(function($) {
    function passwordSignInShow(dom) {
        var $password = dom.next();
        console.log(dom);
        ($password.attr('type') === 'password')?$password.attr('type', 'text'):$password.attr('type', 'password');
    }
    //Show password
    $(".pwd-show").click(function () {
        passwordSignInShow($(this));
    });

    var hash = window.location.hash;
    if (hash) {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 1);
        $('ul.auth-toggle-menu li a[href="' + hash + '"]').tab('show');
    }
    $('.auth a').on('click', function (){
    	window.location.reload()
    })

})(window.jQuery);
