import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() set searchResult(val: any) {
    this.searchResult$.next(val ? val.results : []);
  }
  map!: L.Map;
  latitude: number = 51.4457;
  longitude: number = 7.2616;
  latLng: any;
  num!: number;
  name!: string;
  search!: any;
  items: any;
  searchResult$ = new ReplaySubject<any[]>();
  constructor() {}

  ngOnInit(): void {}

  newMap() {
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: 13,
    });

    // Setting for using the default marker icon
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    Marker.prototype.options.icon = iconDefault; // setting iconDefault as the default marker icon

    // Using click event to get Latitude and Longitude values from the map
    const popup = L.popup();
    const onMapClick = (e: any) => {
      popup.setLatLng(e.latlng).setContent(`${e.latlng}`).openOn(this.map);
    };
    this.map.on('click', onMapClick); // leaflet click event

    // tileLayers
    // mapbox street tile
    var mapboxStreet = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1Ijoib21vYm9sYWppLWtveWkiLCJhIjoiY2txZm5weHFxMXJsajJ1b3ZhMjM1eWdkaCJ9.OpqdDwLtyeJdGpAiQFItUQ',
      }
    );
    mapboxStreet.addTo(this.map);

    //street tile
    var googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    //Hybrid tile
    var googleHybrid = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    //Terrain tile
    var googleTerrain = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    this.searchResult$.subscribe((val) => {
      let newLatLng = [];
      // where i is the index
      for (let [i, value] of val.entries()) {
        this.latLng = value.geometry.location;
        this.name = value.name;
        this.num = i + 1;
        newLatLng.push(this.latLng);

        var name = L.marker([this.latLng.lat, this.latLng.lng])
          .bindPopup(`${this.num}. ${this.name}`)
          .addTo(this.map);
        this.items = L.layerGroup([name]);
        this.search = name;
      }

      if (newLatLng.length < 1) {
        return;
      }

      //setting the view of the map to the markers
      const group = L.latLngBounds(newLatLng);

      this.map.fitBounds(group);
    });

    // map layers control
    var baseMaps = {
      MapboxStreet: mapboxStreet,
      GoogleStreets: googleStreets,
      GoogleSatelite: googleHybrid,
      GoogleTerrain: googleTerrain,
    };
    // layer control
    L.control.layers(baseMaps).addTo(this.map);
  }

  ngAfterViewInit() {
    this.newMap();
  }
}
