var jQuery = jQuery.noConflict();
 
jQuery(document).ready(function ($) {
    
    "use strict";
    
    $("#homePageCarousel").owlCarousel({
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem: true
    });
    
});