var gamejQuery = jQuery.noConflict();

gamejQuery(document).ready(function ($) {

	"use strict";

	//Instantiate global newsletterPopup
	$("#gameRulesPopup").enhanceWithin().popup();
	
	$("#gameTermsPopup").enhanceWithin().popup();

	$("#quitGamePopup").enhanceWithin().popup();

	$("#gameFavPopup").enhanceWithin().popup();

	//Instantiate GAME menuPanel
	$("#gameNavPanel").panel().enhanceWithin();

	$('#gameTermsPopup').css('overflow-y', 'visable').css('overflow-x', 'hidden');
	
	////////////////////////////////////////////////////
	////////////////////////////////////////////////////
	//Game pave slide animation 
	// $(document).on('pagebeforeshow', '#signIn_page', function () {
	// 	$(document).on('click', '#gameButton', function () {
	// 		$.mobile.navigate("#game_page", {
	// 			transition: "slide"
	// 		});
	// 	});
	// });
	////////////////////////////////////////////////////
	
	////////////////////////////////////////////////////
	//sign up to game
	$(document).on('pagebeforeshow', '#signUp_page', function () {
		$(document).on('click', '#gameButton', function () {
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
	
	//Map GLOBAL VARIABLES
	
	var map;//GOOGLE MAPS OBJ
	var cav_Marker, mar_Marker, tit_Marker, reg_Marker;//PUB MARKERS	
	var cav_InfoContent, mar_InfoContent, tit_InfoContent, reg_InfoContent;//PUB INFO CONTENT	
	var cav_InfoWindow, mar_InfoWindow, tit_InfoWindow, reg_InfoWindow;//PUB INFO WINDOWS
	var userCurrentPos;//USER CURRENT COORD
	var infoWindow;//USER CURRENT COORD INFO WINDOW
	var userPosMarker;//MARKER USED TO SHOW USER POSITION
	var posBoolean=0;//variable used to update user's position. Don't judge
	var cav_latlng, mar_latlng, tit_latlng, reg_latlng;//Pubs coords - google.maps.LatLng obj
	var cav_Circle, mar_Circle, tit_Circle, reg_Circle;//PUB boundaries circle
	var cav_pubCircle, mar_pubCircle, tit_pubCircle, reg_pubCircle;
	
	$(document).on('pageshow', '#game_page', function (e, data) {
		setTimeout(function () {

			
			var mapOptions = {
			zoom: 11,
			disableDefaultUI: true,
			gestureHandling: 'auto',
			center: new google.maps.LatLng(51.520780, -0.139900), // Cavendish

			//MAP STYLE GUIDE
			styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#dddddd"},{"lightness":40},{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]
		};
			

			//MAP OBJECT
			var mapElement = document.getElementById('map');
			map = new google.maps.Map(mapElement, mapOptions);
			
			
			//////////////////////////////////////////////////
			//MAP MARKERS
		 	cav_Marker = new google.maps.Marker({
				position: new google.maps.LatLng(51.520780, -0.139900),
				map: map,
				title: 'Old Cavendish!'
			});
			
			mar_Marker = new google.maps.Marker({
				position: new google.maps.LatLng(51.522351, -0.154974),
				map: map,
				title: 'Marylebone!'
			});
			
			tit_Marker = new google.maps.Marker({
				position: new google.maps.LatLng(51.518154, -0.141053),
				map: map,
				title: 'Little Titchfield!'
			});
			
			reg_Marker = new google.maps.Marker({
				position: new google.maps.LatLng(51.516931, -0.142847),
				map: map,
				title: 'Little Titchfield!'
			});
			
			
			////////////////////////////////////////////////////
			//MARKER INFO WINDOW CONTENT
			
			cav_InfoWindow = new google.maps.InfoWindow({
				content: cav_InfoContent
			});
			
			mar_InfoWindow = new google.maps.InfoWindow({
				content: mar_InfoContent
			});
			
			tit_InfoWindow = new google.maps.InfoWindow({
				content: tit_InfoContent
			});
			
			reg_InfoWindow = new google.maps.InfoWindow({
				content: reg_InfoContent
			});
			
			infoWindow = new google.maps.InfoWindow({map: map});
			
			//////////////////////////////////////////////////
			//MARKER CLICK LISTENERS
			cav_Marker.addListener('click', function() {
				
				user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
				cav_bounds = cav_pubCircle.getBounds();
			  	
				if(cav_bounds.contains(user_LatLng)){
					cav_InfoWindow.open(map, cav_Marker);
				}else{
					alert("You are too far to play here");
				}
			});
			
			mar_Marker.addListener('click', function() {
				
				user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
				mar_bounds = mar_pubCircle.getBounds();
			  		
				if(mar_bounds.contains(user_LatLng)){
					mar_InfoWindow.open(map, mar_Marker);
				}else{
					alert("You are too far to play here");
				}
			});
			
			tit_Marker.addListener('click', function() {
				
				user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
				tit_bounds = tit_pubCircle.getBounds();
				
				if(tit_bounds.contains(user_LatLng)){
					tit_InfoWindow.open(map, tit_Marker);
				}else{
					alert("You are too far to play here");
				}
			});
			
			reg_Marker.addListener('click', function() {
				
				user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
				reg_bounds = reg_pubCircle.getBounds();
				
				if(reg_bounds.contains(user_LatLng)){
					reg_InfoWindow.open(map, reg_Marker);
				}else{
					alert("You are too far to play here");
				}	
			});
			
			///////////////////////////////////////////////////
			
			//SETS MARKER ICONS
			cav_Marker.setIcon('assets/ico/pub_marker_logo2.png');
			mar_Marker.setIcon('assets/ico/pub_marker_logo2.png');
			tit_Marker.setIcon('assets/ico/pub_marker_logo2.png');
			reg_Marker.setIcon('assets/ico/pub_marker_logo2.png');

			//USER CURRENT LOCATION
      		findMe();
			
      		addPubRadius();
			
			
		}, 1);
	}); 
	
	//GAME GPS BUTTON click LISTNER
	$("#gameUserLocationBtn").on('click', function(){
		findMe();
		addMarker();
//		withinRadius();
	});
	
	
	//Global VAr for user coords
	var user_LatLng; 
//	var user_Circle;
//	var user_pubCircle;
	var circle;
	var bounds, cav_bounds, mar_bounds, tit_bounds, reg_bounds;
	
	
	function withinRadius(){
		
		user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
		circle = new google.maps.Circle({
			map: map,
			clickable: false,
			// metres
			radius: 30,
			fillColor: '#fff',
			fillOpacity: .0,
			strokeColor: '#313131',
			strokeOpacity: .0,
			center: user_LatLng,
			strokeWeight: .8
		});
		// Attach circle to marker
		circle.bindTo('center', userPosMarker, 'position');

//		var testBoundry = new google.maps.LatLng(51.606702, -0.193597);
		
		bounds = circle.getBounds();
		cav_bounds = cav_pubCircle.getBounds();
		mar_bounds = mar_pubCircle.getBounds();
		tit_bounds = tit_pubCircle.getBounds();
		reg_bounds = reg_pubCircle.getBounds();

		if(bounds.contains(user_LatLng)){
			alert("home");
		}else if(cav_bounds.contains(user_LatLng)){
			alert("cav");
		}else if(mar_bounds.contains(user_LatLng)){
			alert("mar");
		}else if(tit_bounds.contains(user_LatLng)){
			alert("tit");
		}else if(reg_bounds.contains(user_LatLng)){
			alert("reg");
		}else{
			alert("nothing near by");
		}
//		alert( bounds.contains(user_LatLng));
//		alert(cav_latlng);
	}
	
	//Adds 40 meters radius to pubs
	function addPubRadius(){
		cav_latlng = new google.maps.LatLng(51.520780, -0.139900);
		mar_latlng = new google.maps.LatLng(51.522351, -0.154974);
		tit_latlng = new google.maps.LatLng(51.518154, -0.141053);
		reg_latlng = new google.maps.LatLng(51.516931, -0.142847);
		
		//Radius Options
		cav_Circle = {
			strokeColor: "#ffffff",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#dedede",
			fillOpacity: 0.35,
			map: map,
			center: cav_latlng,
			radius: 30 // in meters
		};	
		mar_Circle = {
			strokeColor: "#ffffff",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#dedede",
			fillOpacity: 0.35,
			map: map,
			center: mar_latlng,
			radius: 30 // in meters
		};	
		tit_Circle = {
			strokeColor: "#ffffff",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#dedede",
			fillOpacity: 0.35,
			map: map,
			center: tit_latlng,
			radius: 30 // in meters
		};
		reg_Circle = {
			strokeColor: "#ffffff",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#dedede",
			fillOpacity: 0.35,
			map: map,
			center: reg_latlng,
			radius: 30 // in meters
		};
		
		//ACtual radius objs
		cav_pubCircle = new google.maps.Circle(cav_Circle);
		cav_pubCircle.bindTo('center', cav_Marker, 'position');
		
		mar_pubCircle = new google.maps.Circle(mar_Circle);
		mar_pubCircle.bindTo('center', mar_Marker, 'position');
		
		tit_pubCircle = new google.maps.Circle(tit_Circle);
		tit_pubCircle.bindTo('center', tit_Marker, 'position');
		
		reg_pubCircle = new google.maps.Circle(reg_Circle);
		reg_pubCircle.bindTo('center', reg_Marker, 'position');
	}
	
	//FUNCTION FOR FINDING USER LOCATION
	function findMe(){
		// Try HTML5 geolocation.
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(function(position) {
			userCurrentPos = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude
			};

			infoWindow.setPosition(userCurrentPos);
			infoWindow.setContent('You are here!');
			map.setCenter(userCurrentPos);
		  }, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		  });
		} else {
		  // Browser doesn't support Geolocation
		  handleLocationError(false, infoWindow, map.getCenter());
		}
	}

	//GEOLOCATION FAILED HANDLER
	function handleLocationError(browserHasGeolocation, infoWindow, userCurrentPos) {
        infoWindow.setPosition(userCurrentPos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
	
	
	//ADDS MARKER AND UPDATES LOCATION
	function addMarker(){

		if(posBoolean===0){
			userPosMarker = new google.maps.Marker({
				position: new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng),
				map: map,
				animation: google.maps.Animation.DROP,
				title: 'Here you are!'
			});

			//ADDS MARKER TO MAP
			userPosMarker.setMap(map);
//			userPosMarker.setIcon('assets/ico/gps.png');
			
			//lazy way of implementing position update
			posBoolean=posBoolean+1;
		}else{
			//updates current location
			userPosMarker.setPosition(userCurrentPos);
		}
	}

	
	
	cav_InfoContent = '<div id="InfoBoxContent">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Old Cavendish</h1>'+
            '<div id="bodyContent">'+
            '<img src="assets/img/pub1.jpg"><p>Something</p><button>Something Else</button>'+
            '</div>'+
            '</div>';
	mar_InfoContent = '<div id="InfoBoxContent">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Marylebone</h1>'+
            '<div id="bodyContent">'+
            '<img src="assets/img/pub2.jpg"><p>Something</p><button>Something Else</button>'+
            '</div>'+
            '</div>';
	tit_InfoContent = '<div id="InfoBoxContent">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Little Titchfield</h1>'+
            '<div id="bodyContent">'+
            '<img src="assets/img/pub3.jpg"><p>Something</p><button>Something Else</button>'+
            '</div>'+
            '</div>';
	reg_InfoContent = '<div id="InfoBoxContent">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">The Prince Regent</h1>'+
            '<div id="bodyContent">'+
            '<img src="assets/img/pub4.jpg"><p>Something</p><button>Something Else</button>'+
            '</div>'+
            '</div>';
	
	

		
	
	////////////////////////////////////////////////////
	//END OF SCRIPT

});