var jQuery = jQuery.noConflict();

jQuery(document).ready(function ($) {

	"use strict";
	
	//Instantiate global newsletterPopup
	$("#newsletterPopup").enhanceWithin().popup();

	$("#bookingPopup").enhanceWithin().popup();

	$("#forgetPopup").enhanceWithin().popup();

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
		} else {
			alert(newsletterForm.newsletterTextField.value);
			var email = (newsletterForm.newsletterTextField.value);
			console.log(email);
			var dataString = '&email1=' + email;
			console.log(dataString);
			if (email == '') {
				alert("Please Fill All Fields");
			} else {
				// AJAX Code To Submit Form.
				$.ajax({
					type: "POST",
					url: "newsletter.php",
					data: dataString,
					cache: false,
					success: function () {
							//relode page 

						}
						/*success: function (result) {
					alert(result); // print result from query in alert comes up with a must string or something 

					// go second booking page	
					//window.location.href = "#comfirm_page"; // call on game
				},
				error: function () {
					alert("Error please try again.");
				}

				*/







				})
			}
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
		valueNames: ['name', 'address', 'postcode', 'city', {
			attr: 'src',
			name: 'image'
        }, {
			attr: 'href',
			name: 'link'
        }, 'feature1', 'feature2', 'feature3']
	};

	//list object for pub items >LIST.JS
	var userList = new List('users', options);

	//clears filter
	$('.filter-1').on('click', function () {
		userList.filter();
	});
	//Filter atribute = parking
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
	//Filter atribute = wifi
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
	//Filter atribute = tv
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

	//var used to load selected pub
	var userSelectedPub = '';

	//Search item SELECTED FROM SEARCH >HOMEPAGE
	$('#pubCavendish').on("click", function () {
		userSelectedPub = 1;
	});
	$('#pubMarylebone').on("click", function () {
		userSelectedPub = 2;
	});
	$('#pubTichfield').on("click", function () {
		userSelectedPub = 3;
	});
	$('#pubRegent').on("click", function () {
		userSelectedPub = 4;
	});

	$("#viewPub1").on("click", function () {
		displayPub(1);
	});
	$("#viewPub2").on("click", function () {
		displayPub(2);
	});
	$("#viewPub3").on("click", function () {
		displayPub(3);
	});
	$("#viewPub4").on("click", function () {
		displayPub(4);
	});

	//Runs once pub_page is launched
	$(document).on("pageshow", "#pub_page", function () {

		//function adds pub content
		displayPub(userSelectedPub);
		//clears variable
		userSelectedPub = '';
	});

	//Populates dom with pub info
	function displayPub(pubSelected) {
		if (pubSelected === 1) {
			$(".pubs").html("<div class=\"pub_ImageContainer\"><img src=\"assets/img/pub1.jpg\"></div><div class=\"pub_detailsContainer\"><h3 class=\"pub_Name\">Old Cavendish</h3><p class=\"pub_Address\">115 New Cavendish Street</p><p class=\"pub_Postcode\">W1W 6UW</p><p class=\"pub_City\">London</p></div><div class=\"pub_featureContainer\"><img class=\"wifiIcon\" src=\"assets/ico/wi-fi.png\"><p class=\"feature1\">Wifi</p><img class=\"parkingIcon\" src=\"assets/ico/parked-car.png\"><p class=\"feature2\">Parking</p><img class=\"tvIcon\" src=\"assets/ico/television.png\"><p class=\"feature3\">Live TV</p></div><br><a href='#bookingPage'><button class=\" pub_bookButton\">Book a table</button></a><br><br>");
		} else if (pubSelected === 2) {
			$(".pubs").html("<div class=\"pub_ImageContainer\"><img src=\"assets/img/pub2.jpg\"></div><div class=\"pub_detailsContainer\"><h3 class=\"pub_Name\">Marylebone</h3><p class=\"pub_Address\">35 Marylebone Road</p><p class=\"pub_Postcode\">NW1 5LS</p><p class=\"pub_City\">London</p></div><div class=\"pub_featureContainer\"><img class=\"wifiIcon\" src=\"assets/ico/wi-fi.png\"><p class=\"feature1\">Wifi</p><img class=\"tvIcon\" src=\"assets/ico/television.png\"><p class=\"feature3\">Live TV</p></div><br><a href='#bookingPage'><button class=\" pub_bookButton\">Book a table</button></a><br><br>");
		} else if (pubSelected === 3) {
			$(".pubs").html("<div class=\"pub_ImageContainer\"><img src=\"assets/img/pub3.jpg\"></div><div class=\"pub_detailsContainer\"><h3 class=\"pub_Name\">Little Titchfield</h3><p class=\"pub_Address\">4-12 Little Titchfield Street</p><p class=\"pub_Postcode\">W1W 7BY</p><p class=\"pub_City\">London</p></div><div class=\"pub_featureContainer\"><img class=\"parkingIcon\" src=\"assets/ico/parked-car.png\"><p class=\"feature2\">Parking</p></div><br><a href='#bookingPage'><button class=\" pub_bookButton\">Book a table</button></a><br><br>");
		} else if (pubSelected === 4) {
			$(".pubs").html("<div class=\"pub_ImageContainer\"><img src=\"assets/img/pub4.jpg\"></div><div class=\"pub_detailsContainer\"><h3 class=\"pub_Name\">The Prince Regent</h3><p class=\"pub_Address\">309 Regent Street</p><p class=\"pub_Postcode\">W1B 2HW</p><p class=\"pub_City\">London</p></div><div class=\"pub_featureContainer\"><img class=\"tvIcon\" src=\"assets/ico/television.png\"><p class=\"feature3\">Live TV</p></div><br><a href='#bookingPage'><button class=\" pub_bookButton\">Book a table</button></a><br><br>");
		}
	}

	$("#pub_page").delegate("button", "click", function () {
		var c = $('.pub_Name').html();
		alert(c);
	});

	////////////////////////////////////////////////////





});