package com.felipe.silva.rota.model;

public class Parada {

	private String name;
	private Coordenada position;
	
	/*
	 * 
	private Double lat;
	private Double lng;
	 * public Parada(String parada_nome, Double parada_lat, Double parada_lng) {
	 * this.setParada_nome(parada_nome); this.setParada_lat(parada_lat);
	 * this.setParada_lng(parada_lng); }
	 * 
	 * 
	 * 	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}
	 */

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Coordenada getPosition() {
		return position;
	}

	public void setPosition(Coordenada position) {
		this.position = position;
	}


}
