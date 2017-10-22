(function ($) {
    // GET SHIPPING COST
    $('input:radio[name="shipping_method"]').change(function () {
        var shipping_cost_element = $(this).parent().find(".shipping-price");
        var total_order_element = $("order-total").text();

        var order_total = $("input[name='order-total']").val();
        var shipping_method = $(this).val();
        var shipping_area = $("select[name='district_city']").val().toLowerCase();
        var supplier = [];
        $('.supplier').each(function() {
            supplier.push($(this).val());
        });
        data = {'shipping_method': shipping_method, 'shipping_area':shipping_area, 'supplier': supplier};
        $.ajax({
            url: "get_shipping_cost",
            type: 'POST',
            dataType: 'text',
            data: data,
            async: false,
            beforeSend: function(){
                $(".shipping-price").text('');
            },
            success: function( response ){
                var response_data = JSON.parse(response);
                console.log(response_data);
                var formated_shipping_cost = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(response_data.apiResponse.data.attribute.total_shipping_cost);
                shipping_cost_element.text("TK. " + formated_shipping_cost);
                // calculate order total with shipping cost
                var updated_order_total = parseInt(order_total) + parseInt(response_data.apiResponse.data.attribute.total_shipping_cost);
                $(".delivery-cost").text(response_data.apiResponse.data.attribute.shipping_method); // change change delivery type
                $("input[name='order-total-with-delivery-cost']").val(updated_order_total); // updated order total with deliver fee
                $(".order-total").text(new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(updated_order_total));
            },
            complete: function () {

            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( jqXhr, textStatus, errorThrown );
            }
        });
    });
})(window.jQuery);