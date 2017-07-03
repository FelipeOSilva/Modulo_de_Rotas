package com.felipe.silva.rota.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;

@Document(collection = "rotas")
public class Rota {

	@Id
	@Field("rota_id")
	private String rota_id;

	private String name;

	private int vehicleId;
	
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date routeDate;

	private List<Parada> stops;

	private List<Coordenada> path;
	/*
	 * public Rota(String name){ this.setName(name); }
	 * 
	 * public Rota(String name, Date routeDate, List<Parada> stops,
	 * List<Coordenada> path) { this.setName(name);
	 * this.setRouteDate(routeDate); this.setStops(stops); this.setPath(path); }
	 */

	public String getRota_id() {
		return rota_id;
	}

	public void setRota_id(String rota_id) {
		this.rota_id = rota_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getRouteDate() {
		return routeDate;
	}

	public void setRouteDate(Date routeDate) {
		this.routeDate = routeDate;
	}

	public List<Parada> getStops() {
		if (stops == null) {
			stops = new ArrayList<Parada>();
		}
		return stops;
	}

	public void setStops(List<Parada> stops) {
		this.stops = stops;
	}

	public List<Coordenada> getPath() {
		return path;
	}

	public void setPath(List<Coordenada> path) {
		this.path = path;
	}

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

}
