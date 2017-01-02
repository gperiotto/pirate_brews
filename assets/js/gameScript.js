var gamejQuery = jQuery.noConflict();

gamejQuery(document).ready(function ($) {

	"use strict";

	//Instantiate global newsletterPopup
	$("#gameRulesPopup").enhanceWithin().popup();

	$("#quitGamePopup").enhanceWithin().popup();

	$("#gameFavPopup").enhanceWithin().popup();

	//Instantiate GAME menuPanel
	$("#gameNavPanel").panel().enhanceWithin();




	////////////////////////////////////////////////////
	//Game pave slide animation 
	$(document).on('pagebeforeshow', '#signIn_page', function () {
		$(document).on('click', '.gameButton', function () {
			$.mobile.navigate("#game_page", {
				transition: "slide"
			});
		});
	});
	////////////////////////////////////////////////////

	//highlight game tabs
	$("#gameFavPopup").popup({
		afteropen: function (event, ui) {
			$("#game_page [data-role=footer] .footerTaskbar1 p").css("color", "#f03820");

			//			$("#game_page [data-role=footer] .footerTaskbar1 p").text(" ");
		}
	});

	////////////////////////////////////////////////////

	





	////////////////////////////////////////////////////
	//END OF SCRIPT

});