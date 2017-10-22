(function ($) {
    /*------------- coupon-code-section-----------*/

    /*---------------------------------------

     cart page step

     * ---------------------------------------*/

    var navListItems = $('ul.setup-panel li a'),
        allWells = $('.setup-content');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this).closest('li');

        if (!$item.hasClass('disabled')) {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
        }
    });

    $('ul.setup-panel li.active a').trigger('click');

// DEMO ONLY //
    $('#activate-step-2').on('click', function (e) {
        $('ul.setup-panel li:eq(1)').removeClass('disabled');
        $('ul.setup-panel li a[href="#step-2"]').trigger('click');
        $(this).remove();
    });

    $('#activate-step-3').on('click', function (e) {
        $('ul.setup-panel li:eq(2)').removeClass('disabled');
        $('ul.setup-panel li a[href="#step-3"]').trigger('click');
        $(this).remove();
    });

    $('#activate-step-4').on('click', function (e) {
        $('ul.setup-panel li:eq(3)').removeClass('disabled');
        $('ul.setup-panel li a[href="#step-4"]').trigger('click');
        $(this).remove();
    });

    $('#activate-step-3').on('click', function (e) {
        $('ul.setup-panel li:eq(2)').removeClass('disabled');
        $('ul.setup-panel li a[href="#step-3"]').trigger('click');
        $(this).remove();
    })


    // CART: QUANTITY UPDATE
    $(".product-quantity").on('change',function () {
        var qunatityInput = $(this);
        var updatedQuantityValue = parseInt($(this).val());
        var productId = parseInt($(this).data('pid'));
        var previousQuantity = $("input[name='cart["+productId+"]']").val();
        console.log(typeof parseInt(previousQuantity, 10));
        var quantity = (parseInt(updatedQuantityValue) - parseInt(previousQuantity, 10));
        var updatedQuantityErrorMessageDiv = $(this).parent().find(".productQuantityUpdateError");
        var product = {'product_id': productId, 'quantity':quantity};
        console.log(product);
        $.ajax({
            url: "shopping/update",
            type: 'POST',
            dataType: 'text',
            data: product,
            async: false,
            beforeSend: function(){
                $(".cartUpdateProcessModal").show();
            },
            success: function( response ){
                //console.log(response);
                var product = JSON.parse(response);
                if (product.status_code == 201){
                    $(this).val(updatedQuantityValue);
                    location.reload();
                }else if(product.status_code == 404) {
                    qunatityInput.val(previousQuantity);
                    updatedQuantityErrorMessageDiv.show();
                    updatedQuantityErrorMessageDiv.text(product.apiResponse.errors.message);
                }else if(product.status_code == 304) {
                    updatedQuantityErrorMessageDiv.text("Quantity should not be less than one");
                }
            },
            complete: function () {
                $(".cartUpdateProcessModal").hide();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( jqXhr, textStatus, errorThrown );
            }
        });
    })
    
    //cart-item-remove



    $(".remove-quantity").click(function () {
        var $input = $(this).parent().find("input[name='quantity']");
        var updatedQuantityErrorMessageDiv = $(this).parent().find(".productQuantityUpdateError");
        updatedQuantityErrorMessageDiv.hide();
        var quantity = 1;
        if ($input.val() > 1) {
            quantity = parseInt($input.val()) - 1;
            $input.val(quantity);
        }
        var productId = parseInt($input.data('pid'));
        var previousQuantity = $("input[name='cart["+productId+"]']").val();
        var updateQuantity = (parseInt(quantity) - parseInt(previousQuantity, 10));
        var product = {'product_id': productId, 'quantity':updateQuantity};
        if(updateQuantity != 0){
            $.ajax({
                url: "shopping/update",
                type: 'POST',
                dataType: 'text',
                data: product,
                async: false,
                beforeSend: function(){
                    $(".cartUpdateProcessModal").show();
                },
                success: function( response ){
                    var product = JSON.parse(response);
                    console.log(product);
                    if (product.status_code == 201){
                        location.reload();
                    }else if(product.status_code == 404) {
                        updatedQuantityErrorMessageDiv.show();
                        updatedQuantityErrorMessageDiv.text(product.apiResponse.errors.message);
                    }else if(product.status_code == 304) {
                        updatedQuantityErrorMessageDiv.text("Quantity should not be less than one");
                    }
                },
                complete: function () {
                    $(".cartUpdateProcessModal").hide();
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( jqXhr, textStatus, errorThrown );
                }
            });
        }
    })

    $(".add-quantity").click(function () {
        var $input = $(this).parent().find("input[name='quantity']");
        var updatedQuantityErrorMessageDiv = $(this).parent().find(".productQuantityUpdateError");
        var quantity = parseInt($input.val()) + 1;

        var productId = parseInt($input.data('pid'));
        var previousQuantity = $("input[name='cart["+productId+"]']").val();
        var updateQuantity = (parseInt(quantity) - parseInt(previousQuantity, 10));
        var product = {'product_id': productId, 'quantity':updateQuantity};
        $.ajax({
            url: "shopping/update",
            type: 'POST',
            dataType: 'text',
            data: product,
            async: false,
            beforeSend: function(){
                $(".cartUpdateProcessModal").show();
            },
            success: function( response ){
                //console.log(response);
                var product = JSON.parse(response);
                console.log(product);
                if (product.status_code == 201){
                    $input.val(quantity);
                    location.reload();
                }else if(product.status_code == 404) {
                    $input.val($input.val());
                    updatedQuantityErrorMessageDiv.show();
                    updatedQuantityErrorMessageDiv.text(product.apiResponse.errors.message);
                    //disable add button
                    $(".add-quantity").prop("disabled",true);
                }else if(product.status_code == 304) {
                    updatedQuantityErrorMessageDiv.text("Quantity should not be less than one");
                }

            },
            complete: function () {
                $(".cartUpdateProcessModal").hide();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( jqXhr, textStatus, errorThrown );
            }
        });
    })

})(window.jQuery);