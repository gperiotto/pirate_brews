var jQuery = jQuery.noConflict();
 
jQuery(document).ready(function ($) {
    
    "use strict";
    
    //Instantiate global popup
    $( "#newsletterPopup" ).enhanceWithin().popup();
    
    $("#homePageCarousel").owlCarousel({
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem: true
    });
    
    //Fixes parrot img getting cut off
    $("#nav-panel").panel({
        beforeclose: function (event, ui) {
            $('[data-role="footer"]').css("overflow", "visible");
            $('.ui-footer').css("overflow", "visible");
            $('.ui-header').css('overflow' , 'hidden');   
        }
    });
    
//    $("input.newsletterButton").removeAttr('class');
});