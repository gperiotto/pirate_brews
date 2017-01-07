var gamejQuery = jQuery.noConflict();

gamejQuery(document).ready(function ($) {

	"use strict";

	//Instantiate global newsletterPopup
	$("#gameRulesPopup").enhanceWithin().popup();
	
	$("#gameTermsPopup").enhanceWithin().popup();

	$("#quitGamePopup").enhanceWithin().popup();

	$("#gameFavPopup").enhanceWithin().popup();
	
	$('#gameHintsPopup').enhanceWithin().popup();
	
	$("#gamePubPopup").enhanceWithin().popup();
	
	$("#gameTreasureFoundPopup").enhanceWithin().popup();
	
	//Instantiate GAME menuPanel
	$("#gameNavPanel").panel().enhanceWithin();

	$('#gameTermsPopup').css('overflow-y', 'visable').css('overflow-x', 'hidden');
	
	////////////////////////////////////////////////////
	////////////////////////////////////////////////////
	//Game pane slide animation 
//	$(document).on('pagebeforeshow', '#signIn_page', function () {
//		$(document).on('click', '#gameButton', function () {
//			$.mobile.navigate("#game_page", {
//				transition: "slide"
//			});
//		});
//	});
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
//			$("#game_page [data-role=footer] .footerTaskbar1 p").css("color", "#f03820");

			//			$("#game_page [data-role=footer] .footerTaskbar1 p").text(" ");
		}
	});

	////////////////////////////////////////////////////
	//updates hint popup window
	$("#gameHintsPopup").popup({
		afteropen: function (event, ui) {
			hintsUpdater();
		}
	});
	
	////////////////////////////////////////////////////
	//GAME POPUP - AFTERCLOSE EVENT
	$( "#gamePubPopup" ).popup({
		afterclose: function( event, ui ) {
			$("#gamePubPopup_hints").html('');
			$("#gamePubPopup_points span").html('0');
	  	}
	});
	
	////////////////////////////////////////////////////
	//TREASURE POPUP - ON CLOSE
	$("#gameTreasureFoundPopup").popup({
		afterclose: function (event, ui) {
			$('#poiFav1 input').css('display','none');
			$('#poiFav2 input').css('display','none');
			$('#poiFav3 input').css('display','none');
			$('#poiFav4 input').css('display','none');
			
			$("#gameTreasureFoundPopup_pts").html("");
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
	var cav_Circle, mar_Circle, tit_Circle, reg_Circle;//PUB boundaries circle OPTIONS
	var cav_pubCircle, mar_pubCircle, tit_pubCircle, reg_pubCircle;//CIRCLE OBJ - google.maps.Circle obj
	var pubIndex=0;//used to determine selected pub
	var treasureIndex=0;//determines treasure item
	var pts=0;// variable for turn points
	
	var poi_Marker1, poi_Marker2, poi_Marker3, poi_Marker4; //GMAPS POINT OF INTEREST MARKERS
	var poi_latlng1, poi_latlng2, poi_latlng3, poi_latlng4; // Gmaps POI COORDiNATES
	var poi_Circle1, poi_Circle2, poi_Circle3, poi_Circle4; // GMAPS CIRCLE OPTIONS
	var poi_pubCircle1, poi_pubCircle2, poi_pubCircle3, poi_pubCircle4; //GMAPS CIRCLE OBJS
//	var userPoi = ["false", "false", "false", "false"];
	
	//Global VAr for user coords
	var user_LatLng; 
	var circle;
	var bounds, cav_bounds, mar_bounds, tit_bounds, reg_bounds;
	var poi_bounds1, poi_bounds2, poi_bounds3, poi_bounds4;
	
	
	//VARs WHICH ARE CONNECTED TO DB
	var userName='';
	var userScore=0;
	var userTokens =5;
	var treasureHints = ["false", "false", "false", "false", "false", "false", "false", "false"];
	var userFavorites = ["false", "false", "false", "true"];
	
	//GOOGLE MAPS with rendering fix
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
			
			poi_Marker1 = new google.maps.Marker({
				position: new google.maps.LatLng(51.521366, -0.139042),
				map: map,
				title: 'BT Tower'
			});
			
			poi_Marker2 = new google.maps.Marker({
				position: new google.maps.LatLng(51.522878, -0.154973),
				map: map,
				title: 'Madame Tussauds'
			});
			
			poi_Marker3 = new google.maps.Marker({
				position: new google.maps.LatLng(51.515199, -0.141834),
				map: map,
				title: 'Oxford street'
			});
			
			poi_Marker4 = new google.maps.Marker({
				position: new google.maps.LatLng(51.516560, -0.145087),
				map: map,
				title: 'Cavendish Square Gardens'
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
				
				pubIndex=1;//sets index
				updateGamePopup();//UPDATES GAME POPUP
				
				user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
				cav_bounds = cav_pubCircle.getBounds();
			  	
				if(cav_bounds.contains(user_LatLng)){
					$( "#gamePubPopup" ).popup( "open" ); 
				}else{
//					alert("You are too far to play here");
					$( "#gamePubPopup" ).popup( "open" ); 
					
				}
			});
			
			mar_Marker.addListener('click', function() {
				
				pubIndex=2;//sets index
				updateGamePopup();//UPDATES GAME POPUP
				
				user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
				mar_bounds = mar_pubCircle.getBounds();
			  		
				if(mar_bounds.contains(user_LatLng)){
					$( "#gamePubPopup" ).popup( "open" ); 
				}else{
					alert("You are too far to play here");
				}
			});
			
			tit_Marker.addListener('click', function() {
				
				pubIndex=3;//sets index
				updateGamePopup();//UPDATES GAME POPUP
				
				user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
				tit_bounds = tit_pubCircle.getBounds();
				
				if(tit_bounds.contains(user_LatLng)){
					$( "#gamePubPopup" ).popup( "open" ); 
				}else{
					alert("You are too far to play here");
				}
			});
			
			reg_Marker.addListener('click', function() {
				
				pubIndex=4;//sets index
				updateGamePopup();//UPDATES GAME POPUP
				
				user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
				reg_bounds = reg_pubCircle.getBounds();
				
				if(reg_bounds.contains(user_LatLng)){
//					reg_InfoWindow.open(map, reg_Marker);
					$( "#gamePubPopup" ).popup( "open" ); 
				}else{
					alert("You are too far to play here");
				}	
			});
			
			poi_Marker1.addListener('click', function() {
				treasureIndex=1;
				updatePoiPopup();
				$( "#gameTreasureFoundPopup" ).popup( "open" );
			});
			
			poi_Marker2.addListener('click', function() {
				treasureIndex=2;
				updatePoiPopup();
				$( "#gameTreasureFoundPopup" ).popup( "open" );
			});
			
			poi_Marker3.addListener('click', function() {
				treasureIndex=3;
				updatePoiPopup();
				$( "#gameTreasureFoundPopup" ).popup( "open" );
			});
			
			poi_Marker4.addListener('click', function() {
				treasureIndex=4;
				updatePoiPopup();
				$( "#gameTreasureFoundPopup" ).popup( "open" );
			});
			
			
			
			///////////////////////////////////////////////////
			
			//SETS MARKER ICONS
			cav_Marker.setIcon('assets/ico/pub_marker_logo2.png');
			mar_Marker.setIcon('assets/ico/pub_marker_logo2.png');
			tit_Marker.setIcon('assets/ico/pub_marker_logo2.png');
			reg_Marker.setIcon('assets/ico/pub_marker_logo2.png');

			poi_Marker1.setIcon('assets/ico/cross.png');
			poi_Marker2.setIcon('assets/ico/cross.png');
			poi_Marker3.setIcon('assets/ico/cross.png');
			poi_Marker4.setIcon('assets/ico/cross.png');
			
			//hides POIs
//			poi_Marker1.setVisible(false); 
//			poi_Marker2.setVisible(false); 
//			poi_Marker3.setVisible(false); 
//			poi_Marker4.setVisible(false); 
			
			//USER CURRENT LOCATION
      		findMe();
			//DRAWs PUB RADIUS
      		addPubRadius();
			//Well what the function says x2
			updateGamePopup();
			
			
			favoritesUpdater();
			hintsUpdater();
		}, 1);
	}); 
	
	
	//GAME GPS BUTTON click LISTNER
	$("#gameUserLocationBtn").on('click', function(){
		findMe();
		addMarker();
	});
	
	//GAME DIG FOR TREASURE btn click Listener
	$("#gameDigForTreasureBtn").on('click', function(){
		findMe();
		
		user_LatLng = new google.maps.LatLng(userCurrentPos.lat,userCurrentPos.lng);
		poi_bounds1 = poi_pubCircle1.getBounds();
		poi_bounds2 = poi_pubCircle2.getBounds();
		poi_bounds3 = poi_pubCircle3.getBounds();
		poi_bounds4 = poi_pubCircle4.getBounds();
		
		if(poi_bounds1.contains(user_LatLng)){
			
			poi_Marker1.setVisible(true);//makes marker visible 
			userScore=userScore+2000; //adds 2k points
			treasureIndex=1; //setsINDEX
			updatePoiPopup();//well what it says
			$("#gameTreasureFoundPopup_pts").html("<span>+2000 </span>Points");
			$( "#gameTreasureFoundPopup" ).popup( "open" );//opens
			
		}else if(poi_bounds2.contains(user_LatLng)){

			poi_Marker2.setVisible(true); 
			userScore=userScore+2000; //adds 2k points
			treasureIndex=2; //setsINDEX
			updatePoiPopup();//well what it says
			$("#gameTreasureFoundPopup_pts").html("<span>+2000 </span>Points");
			$( "#gameTreasureFoundPopup" ).popup( "open" );//opens
			
		}else if(poi_bounds3.contains(user_LatLng)){

			poi_Marker3.setVisible(true); 
			userScore=userScore+2000; //adds 2k points
			treasureIndex=3; //setsINDEX
			updatePoiPopup();//well what it says
			$("#gameTreasureFoundPopup_pts").html("<span>+2000 </span>Points");
			$( "#gameTreasureFoundPopup" ).popup( "open" );//opens

			
		}else if(poi_bounds4.contains(user_LatLng)){

			poi_Marker4.setVisible(true); 
			userScore=userScore+2000; //adds 2k points
			treasureIndex=4; //setsINDEX
			updatePoiPopup();//well what it says
			$("#gameTreasureFoundPopup_pts").html("<span>+2000 </span>Points");
			$( "#gameTreasureFoundPopup" ).popup( "open" );//opens

			
		}else{
			alert("No treasure here.");
		}
		
	});
	
	//gamepopup PLAY BUTTON CLICK LISTENER
	$("#gamePubPopup_setSailButton").on('click', function(){
		
		if(userTokens===0){
			alert("Buy more tokens");
		}else{
			
			//Animates logo
			$({deg: 0}).animate({deg: 1080}, {
				step: function(now, fx){
					$("#gamePubPopup_img").css({
						 transform: "rotate(" + now + "deg)"
					});
				}
			});

			//RUNS AFTER ANIMATION PLAYS
			setTimeout(function () {
				pts = 0;

				var mapChance = Math.floor(Math.random() * 80) + 1 ;
					console.log("mapChance val:"+mapChance);

				//hint finder
				if(mapChance===1){
					alert("hint piece 1");
					treasureHints[0]='true';
					pts=pts+900;
					$("#gamePubPopup_hints").html('Found a Hint!');	
				}else if(mapChance===2){
					alert("hint piece 2");
					treasureHints[1]='true';
					pts=pts+900;
					$("#gamePubPopup_hints").html('Found a Hint!');	
				}else if(mapChance===3){
					alert("hint piece 3");
					treasureHints[2]='true';
					pts=pts+900;
					$("#gamePubPopup_hints").html('Found a Hint!');	
				}else if(mapChance===4){
					alert("hint piece 4");
					treasureHints[3]='true';
					pts=pts+900;
					$("#gamePubPopup_hints").html('Found a Hint!');	
				}else if(mapChance===5){
					alert("hint piece 5");
					treasureHints[4]='true';
					pts=pts+900;
					$("#gamePubPopup_hints").html('Found a Hint!');	
				}else if(mapChance===6){
					alert("hint piece 6");
					treasureHints[5]='true';
					pts=pts+900;
					$("#gamePubPopup_hints").html('Found a Hint!');	
				}else if(mapChance===7){
					alert("hint piece 7");
					treasureHints[6]='true';
					pts=pts+900;
					$("#gamePubPopup_hints").html('Found a Hint!');	
				}else if(mapChance===8){
					alert("hint piece 8");
					treasureHints[7]='true';
					pts=pts+900;
					$("#gamePubPopup_hints").html('Found a Hint!');	
				}else{
					$("#gamePubPopup_hints").html('');	
				}
				
				//base scoring
				pts=pts+100;

				//adds to USER SCORE
				userScore=userScore+pts;

				updateGamePopup();
			}, 500);
			
			//Deducts User Token
			userTokens=userTokens-1;
			
			updateGamePopup();//update Popup
		}
		
	});
	
	////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////
	//Favourite Checkbox clicklistner
	$('#poiFav1 input').click(function(){
		if($(this).is(':checked')){
			userFavorites[0]='true';
		} else {
			userFavorites[0]='false';
		}
		favoritesUpdater();
	});
	$('#poiFav2 input').click(function(){
		if($(this).is(':checked')){
			userFavorites[1]='true';
		} else {
			userFavorites[1]='false';
		}
		favoritesUpdater();
	});
	$('#poiFav3 input').click(function(){
		if($(this).is(':checked')){
			userFavorites[2]='true';
		} else {
			userFavorites[2]='false';
		}
		favoritesUpdater();
	});
	$('#poiFav4 input').click(function(){
		if($(this).is(':checked')){
			userFavorites[3]='true';
		} else {
			userFavorites[3]='false';
		}
		favoritesUpdater();
	});
	////////////////////////////////////////////////////////////////
	
	////////////////////////////////////////////////////////////////
	//Click events for SAVED FAVs -tab
	$('#favoritedPoi1').click(function(){
		treasureIndex=1;
		updatePoiPopup();
		opnMyPopup("#gameTreasureFoundPopup");
	});
	$('#favoritedPoi2').click(function(){
		treasureIndex=2;
		updatePoiPopup();
		opnMyPopup("#gameTreasureFoundPopup");
	});
	$('#favoritedPoi3').click(function(){
		treasureIndex=3;
		updatePoiPopup();
		opnMyPopup("#gameTreasureFoundPopup");
	});
	$('#favoritedPoi4').click(function(){
		treasureIndex=4;
		updatePoiPopup();	
		opnMyPopup("#gameTreasureFoundPopup");
		
	});

	////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////
	//updates FavsCheckBoxes From userFavorites Array
	function hintsUpdater(){
		var noHints=0;
		for(var x=0;x<treasureHints.length;x++){
			
			var hintItems = 'hint'+(x+1);
			console.log(treasureHints[x]+":"+x);
			
			if(treasureHints[x]==='true'){		
				$('#'+hintItems).css("display", "block");
				noHints=noHints+1;
				
				if(x===0 || x===1){
					$('.gameHintsPopupDiv hr:nth-of-type(1)').css("display", "block");
				}else if(x===2 || x===3){
					$('.gameHintsPopupDiv hr:nth-of-type(2)').css("display", "block");
				}else if (x===4 || x===5){
					$('.gameHintsPopupDiv hr:nth-of-type(3)').css("display", "block");
				}
				
			}else{
				$('#'+hintItems).css("display", "none");
			}
		}	
		
		if(noHints===0){
			$('#hintsPopupEmpty').css("display", "block");
		}else{
			$("#hintsPopupEmpty").css("display", "none");
		}
	}
	
	//Populates TreasurePOI popup
	function updatePoiPopup(){
		
		if(treasureIndex===1){
			$("#gameTreasureFoundPopup_item").html('BT Tower');	
			$("#gameTreasureFoundPopup_img").attr('src', 'assets/img/poi1.png');
			$("#poiInfo").html("The BT Tower is a communications tower located in Fitzrovia, London, owned by BT Group.");
			$('#poiFav1 input').css('display','block');
			
		}else if(treasureIndex===2){
			$("#gameTreasureFoundPopup_item").html('Madame Tussauds');	
			$("#gameTreasureFoundPopup_img").attr('src', 'assets/img/poi2.png');
			$("#poiInfo").html("Madame Tussauds is a museum that contains wax models of famous people.");
			$('#poiFav2 input').css('display','block');
			
		}else if(treasureIndex===3){
			$("#gameTreasureFoundPopup_item").html('Oxford street');	
			$("#gameTreasureFoundPopup_img").attr('src', 'assets/img/poi3.png');
			$("#poiInfo").html("Oxford Street is Europe's busiest shopping street.");
			$('#poiFav3 input').css('display','block');
			
		}else if(treasureIndex===4){
			$("#gameTreasureFoundPopup_item").html('Cavendish Square Gardens');	
			$("#gameTreasureFoundPopup_img").attr('src', 'assets/img/poi4.png');
			$("#poiInfo").html("Cavendish Square Garden is a formal London Square, laid out on a circular plan enclosed with a perimeter hedge.");
			$('#poiFav4 input').css('display','block');
			
		}else{}
	}
	
	//JQM DOESNT SUPPORT popup CHAINING.. So this is a fix
	function opnMyPopup(myPage) {
		history.back();
		setTimeout(function () {
			$(myPage).popup('open');
		}, 100);
	}
	
	//updates FavsCheckBoxes From userFavorites Array
	function favoritesUpdater(){
		
		for(var x=0;x<userFavorites.length;x++){
			var chkbox = 'poiFav'+(x+1)+' input';
			var favTabItems = 'favoritedPoi'+(x+1);
			if(userFavorites[x]==='true'){		
				$('#'+chkbox).attr("checked", true);
				$('#'+favTabItems).css("display", "block");
			}else{
				$('#'+favTabItems).css("display", "none");
			}
		}
		if($('#favoritedPoi1').css('display') == 'none' && $('#favoritedPoi2').css('display') == 'none' && $('#favoritedPoi3').css('display') == 'none' && $('#favoritedPoi4').css('display') == 'none'){
			$("#favPopupEmpty").css("display", "block");
		}else{
			$("#favPopupEmpty").css("display", "none");
		}
	}
	
	//Adds correct pub info to GAME popup
	function updateGamePopup(){
		
		//updates heading
		if(pubIndex===1){
			$("#gamePubPopup_header").html('Welcome to The Old Cavendish');
		} else if(pubIndex===2){
			$("#gamePubPopup_header").html('Welcome to Marylebone');
		} else if(pubIndex===3){
			$("#gamePubPopup_header").html('Welcome to Little Titchfield');
		} else if(pubIndex===4){
			$("#gamePubPopup_header").html('Welcome to The Prince Regent');
		} 
		//updates tokens
		$("#gamePubPopup_tokens").html(userTokens.toString());
		//updates points
		$("#gamePubPopup_points span").html(pts.toString());
		
	}
	
	//Adds 30 meters radius to pubs
	function addPubRadius(){
		cav_latlng = new google.maps.LatLng(51.520780, -0.139900);
		mar_latlng = new google.maps.LatLng(51.522351, -0.154974);
		tit_latlng = new google.maps.LatLng(51.518154, -0.141053);
		reg_latlng = new google.maps.LatLng(51.516931, -0.142847);
		
		poi_latlng1 = new google.maps.LatLng(51.521366, -0.139042);
		poi_latlng2 = new google.maps.LatLng(51.522878, -0.154973);
		poi_latlng3 = new google.maps.LatLng(51.515199, -0.141834);
		poi_latlng4 = new google.maps.LatLng(51.516560, -0.145087);
		
		//CIRCLE Options
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
		
		poi_Circle1 = {
			strokeColor: "#ffffff",
			strokeOpacity: 0.0,
			strokeWeight: 2,
			fillColor: "#dedede",
			fillOpacity: 0.0,
			map: map,
			center: poi_latlng1,
			radius: 60 // in meters
		};
		poi_Circle2 = {
			strokeColor: "#ffffff",
			strokeOpacity: 0.0,
			strokeWeight: 2,
			fillColor: "#dedede",
			fillOpacity: 0.0,
			map: map,
			center: poi_latlng2,
			radius: 60 // in meters
		};
		poi_Circle3 = {
			strokeColor: "#ffffff",
			strokeOpacity: 0.0,
			strokeWeight: 2,
			fillColor: "#dedede",
			fillOpacity: 0.0,
			map: map,
			center: poi_latlng3,
			radius: 60 // in meters
		};
		poi_Circle4 = {
			strokeColor: "#ffffff",
			strokeOpacity: 0.0,
			strokeWeight: 2,
			fillColor: "#dedede",
			fillOpacity: 0.0,
			map: map,
			center: poi_latlng4,
			radius: 60 // in meters
		};
		
		//ACtual CIRCLE objs
		cav_pubCircle = new google.maps.Circle(cav_Circle);
		cav_pubCircle.bindTo('center', cav_Marker, 'position');
		
		mar_pubCircle = new google.maps.Circle(mar_Circle);
		mar_pubCircle.bindTo('center', mar_Marker, 'position');
		
		tit_pubCircle = new google.maps.Circle(tit_Circle);
		tit_pubCircle.bindTo('center', tit_Marker, 'position');
		
		reg_pubCircle = new google.maps.Circle(reg_Circle);
		reg_pubCircle.bindTo('center', reg_Marker, 'position');
		
		poi_pubCircle1 = new google.maps.Circle(poi_Circle1);
		poi_pubCircle1.bindTo('center', poi_Marker1, 'position');
		
		poi_pubCircle2 = new google.maps.Circle(poi_Circle2);
		poi_pubCircle2.bindTo('center', poi_Marker2, 'position');
		
		poi_pubCircle3 = new google.maps.Circle(poi_Circle3);
		poi_pubCircle3.bindTo('center', poi_Marker3, 'position');
		
		poi_pubCircle4 = new google.maps.Circle(poi_Circle4);
		poi_pubCircle4.bindTo('center', poi_Marker4, 'position');
		
		
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

	
	
	cav_InfoContent = '';
	mar_InfoContent = ''; 
	tit_InfoContent = '';
	reg_InfoContent = '';
	
	
	
	
	

});