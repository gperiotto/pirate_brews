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
    ////////////////////////////////////////////////////


    //Fixes FOOTER parrot img getting cut off
    $("#nav-panel").panel({
        beforeclose: function (event, ui) {
            $('[data-role="footer"]').css("overflow", "visible");
            $('.ui-footer').css("overflow", "visible");
            $('.ui-header').css('overflow', 'hidden');
        }
    });
    ////////////////////////////////////////////////////


    //Newsletter field validator
    var newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.onsubmit = function () {
        if (newsletterForm.newsletterTextField.value === '') {
            $("[data-role='popup'] [role='main'] .ui-corner-all:nth-child(1)").css("border-color", "#e26464");
            $("[data-role='popup'] [role='main'] p.newsletterTextFieldValidation").text("*Please enter your email above");
            return false;
        }
    };
    ////////////////////////////////////////////////////


    //Newsletter styling reset
    $("#newsletterPopup").popup({
        afteropen: function (event, ui) {
            $("[data-role='popup'] [role='main'] .ui-corner-all:nth-child(1)").css("border-color", "#646464");
            $("[data-role='popup'] [role='main'] input:nth-child(1)").val('');
            $("[data-role='popup'] [role='main'] p.newsletterTextFieldValidation").text(" ");
        }
    });
    ////////////////////////////////////////////////////

    //HOME PAGE Search Bar
    $('#home_SearchBar').focus(function () {
        $('div.home_SearchContent').show();
    });

    $('.home_DismissSearch').click(function () {
        $('div.home_SearchContent').fadeOut('medium');
    });

    $('div.home_SearchContent').hide();
    ////////////////////////////////////////////////////
    
    //HOME PAGE SEARCH SORT FILTER >LIST.JS
    var options = {
        valueNames: ['name', 'address', 'postcode', 'city', { attr: 'src', name: 'image' }, { attr: 'href', name: 'link'}, 'feature1', 'feature2', 'feature3']};

    var userList = new List('users', options);

    
    $('.filter-1').on('click', function () {
        userList.filter();
    });

    $('.filter-2').on('click', function () {
        userList.filter(function (item) {
            var feature2 = (item.values().feature2);
            if (feature2 === 'Parking') {
                return true;
            } else {
                return false;
            }
        });
    });
    
    $('.filter-3').on('click', function () {
        userList.filter(function (item) {
            var feature1 = (item.values().feature1);
            if (feature1 === 'Wifi') {
                return true;
            } else {
                return false;
            }
        });
    });
    
     $('.filter-4').on('click', function () {
        userList.filter(function (item) {
            var feature3 = (item.values().feature3);
            if (feature3 === 'Live TV') {
                return true;
            } else {
                return false;
            }
        });
    });
    ////////////////////////////////////////////////////




});