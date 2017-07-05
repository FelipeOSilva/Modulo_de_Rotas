//<![CDATA[
        //Variável de array de pontos de espera
        var waypoints = [];
        //Variavel de array de marcadores
		var markers = [];
	    //Variavel de destino
	    var destination = {};
        //Variável de local de origem
	    var origin = {};
	    function initMap() {    
	    	//Criando o mapa
	        var map = new google.maps.Map(document.getElementById('divMap'), {
	          zoom: 16,
	          center: {lat: -3.793, lng: -38.524}
	        });

	        //Definindo variável Id dos markers
			var uniqueId = markersAux.length+1;
	        //Variável para utilização do serviço para calcular rota "route"
	        directionsService = new google.maps.DirectionsService;
	        //Variável para renderizar a rota no mapa
	        directionsDisplay = new google.maps.DirectionsRenderer({
	          draggable: true,
	          map: map,
	          suppressMarkers: true
	        });
			
	        if(markersAux){
				for(var i=0; i< markersAux.length; i++){
					var marker = new google.maps.Marker({
				        position: markersAux[i].position,
				        map: map, 
				        title: markersAux[i].name,
				        draggable: true
						});
					marker.id = i+1;
					//Determina o local onde o usuário clicou
				    google.maps.event.addListener(marker, "click", (function (marker, markerId) {
				    	return function() {
				        var content = 'nome: ' + this.title + '<br></br>'+
				        				'Latitude: ' + this.position.lat() + '<br></br>'+
				        				'Longitude: ' + this.position.lng();	
				        if(marker.id > 1){
				        	content += "<br></br><button id='marker"+marker.id+"'>Delete</button>";	
				        }
				        var infoWindow = new google.maps.InfoWindow({
				            content: content
				        });	
				        infoWindow.open(map, marker);
				        if(marker.id > 1)
			        		document.getElementById("marker"+marker.id).addEventListener('click', function(){
			        		deleteMarker(marker.id, origin, directionsService, directionsDisplay);
			        	});
				    	}
				    })(marker, marker.id));
				  
				    //Evento para atualizar as posições dos marcadores no array ao mudar-lo
				    google.maps.event.addListener(marker,'dragend', (function(marker, markerId) {
				    	return function() {
				            for (var i = 0; i < markers.length; i++) {				            	
				            	if (markers[i].id == markerId) {				                    
				                    if(markers.length > 1 && i==0){
				                    	origin = marker.getPosition();
				                    	displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);
			                    	}
				                    else if(markers.length > 1 && i == (markers.length -1)){
				                    	destination = marker.getPosition();
				                    	displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);
				                    }			                    
				                	else if((waypoints.length > 0) && (i > 0)){
				                    	waypoints[i-1].location = marker.getPosition();
				                    	displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);
				                    }
								}
				            }
				            }			    	
				    })(marker, marker.id));

					markers.push(marker);
					if(i==0){
						origin = marker.getPosition();
					}
					else if(i == markersAux.length-1){
						destination = marker.getPosition();						
					}
					else{				
						waypoints.push({location: marker.getPosition()})
					}
				}
				displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);
	        }
       
			//Adicionar marcador ao clicar no mapa com o evento 'click'.
			google.maps.event.addListener(map, 'click', function (e) {
				//Determina o local onde o usuário clicou
			    var location = e.latLng;
			    if(markers.length){
					title = prompt("Favor insira o nome da parada");
					if(!title)
						return;
			    }
			    else{
			    	title = prompt("Favor insira o nome de partida");
					if(!title)
						return;   	
			    }
				//Create a marker and placed it on the map.
					var marker = new google.maps.Marker({
					        position: location,
					        map: map, 
					        title: title,
					        draggable: true
					});
			    markers.push(marker);
				
			    if(markers.length == 2){
				    destination = marker.getPosition();
				    directionsDisplay.map = map;  	 
			        displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);
                }                    
			    else if(markers.length > 2){
				    destination = marker.getPosition();
			    	waypoints.push({location: markers[markers.length - 2].getPosition()});
				 	directionsDisplay.map = map;  	 
			        displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);		               
			    }
				//Set unique id
				
			    marker.id = uniqueId;
			    marker.title = title;
			    uniqueId++;
			
			    //Ativando evento click no marcador, para exibir informações sobre o marcador.
			    google.maps.event.addListener(marker, "click", function (e) {
			        var content = 'nome: ' + this.title + '<br></br>'+
			        				'Latitude: ' + this.position.lat() + '<br></br>'+
			        				'Longitude: ' + this.position.lng();
			        if(marker.id > 1){
			        	content += "<br></br><button id='marker"+marker.id+"'>Delete</button>";			        	
			        }
			        var infoWindow = new google.maps.InfoWindow({
			            content: content
			        });
			        infoWindow.open(map, marker);
			        if(marker.id > 1)
		        	document.getElementById("marker"+marker.id).addEventListener('click', function(){
		        		deleteMarker(marker.id, origin, directionsService, directionsDisplay);
		        	});
			    });
			    
			    //Evendo para atualizar as posições dos marcadores no array ao mudar-lo
			    google.maps.event.addListener(marker,'dragend', (function(marker, markerId) {
			    	return function() {

			            for (var i = 0; i < markers.length; i++) {
			            	
			            	if (markers[i].id == markerId) {
			                    
			                    if(markers.length > 1 && i==0){
			                    	origin = marker.getPosition();
			                    	displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);
		                    	}
			                    else if(markers.length > 1 && i == (markers.length -1)){
			                    	destination = marker.getPosition();
			                    	displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);
			                    }
			                    
			                	else if((waypoints.length > 0) && (i > 0)){
			                    	waypoints[i-1].location = marker.getPosition();
			                    	displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);
			                    }
			                    }
			                }
			            }
			    	
			    })(marker, marker.id));
			    origin = markers[0].getPosition();
			});
		};// Fim da função initMap
		
	    //Função que verifica a melhor rota
	    function displayRoute(originRoute, destinationRoute, waypointsRoute,service, display) {
			service.route({
		        origin: originRoute,
		        destination: destinationRoute,
		        waypoints: waypointsRoute,
		        optimizeWaypoints: true,
		        travelMode: 'DRIVING',
		        avoidTolls: true
	        }, function(response, status) {
	        	console.log(response);
	        	if (status === 'OK') {  
	            	display.setDirections(response);
				}else {
	            	alert('Não foi possível exibir a rota: ' + status);
				}
	        });		
			
	      };// Fim da função displayRoute
	    function deleteMarker(id, origin, directionsService, directionsDisplay) {
			//Encontra e remove o marcador do array
			for (var i = 0; i < markers.length; i++) {
				if (markers[i].id == id) {
					//Remove the marker from Map                  
					markers[i].setMap(null);
					//Remove the marker from array.
					markers.splice(i, 1);
					destination = markers[markers.length-1].getPosition();
					
					if(markers.length == 2)
						waypoints = [];
					else{
						waypoints.splice(i-1,1);
					}
					if(markers.length > 1){
						displayRoute(origin, destination, waypoints, directionsService, directionsDisplay);
					}
					else{
						directionsDisplay.setMap(null);
					}
					return;
				}
			}
	    };//// Fim da função DeleteMarker
	    
	    function sendRoute(){
			for(var i=0; i < markers.length; i++){
				document.getElementById("stopName-"+i).value = markers[i].title;
				document.getElementById("stopLat-"+i).value = markers[i].position.lat();
				document.getElementById("stopLng-"+i).value = markers[i].position.lng();
			}
			return true;
	    }
		initMap();
	//]]>