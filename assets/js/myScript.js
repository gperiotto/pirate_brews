var jQuery = jQuery.noConflict();

jQuery(document).ready(function ($) {

    "use strict";
    
    //Instantiate global newsletterPopup
    $("#newsletterPopup").enhanceWithin().popup();
    
    //Instantiate global menuPanel
    $("#navPanel").panel().enhanceWithin();

    $("#homePageCarousel").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });

    //Fixes parrot img getting cut off
    $("#nav-panel").panel({
        beforeclose: function (event, ui) {
            $('[data-role="footer"]').css("overflow", "visible");
            $('.ui-footer').css("overflow", "visible");
            $('.ui-header').css('overflow', 'hidden');
        }
    });

    //Newsletter field validator
    var newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.onsubmit = function () {
        if (newsletterForm.newsletterTextField.value === '') {
            $("[data-role='popup'] [role='main'] .ui-corner-all:nth-child(1)").css("border-color", "#e26464");
            $("[data-role='popup'] [role='main'] p.newsletterTextFieldValidation").text("*Please enter your email above");
            return false;
        }
    };
 
    //Newsletter styling reset
    $("#newsletterPopup").popup({
        afteropen: function (event, ui) {
            $("[data-role='popup'] [role='main'] .ui-corner-all:nth-child(1)").css("border-color", "#646464");
            $("[data-role='popup'] [role='main'] input:nth-child(1)").val('');
            $("[data-role='popup'] [role='main'] p.newsletterTextFieldValidation").text(" ");
        }
    });

});