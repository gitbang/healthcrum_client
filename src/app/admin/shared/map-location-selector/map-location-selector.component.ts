import { Component, OnInit, Inject } from "@angular/core";
import * as $ from "jquery";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
declare const google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

@Component({
  selector: "app-map-location-selector",
  templateUrl: "./map-location-selector.component.html",
  styleUrls: ["./map-location-selector.component.scss"],
})
export class MapLocationSelectorComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<MapLocationSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    console.log("in pop up", data);
  }

  ngOnInit() {
    var map; //Will contain map object.
    var marker: any = false; ////Has the user plotted their location marker?
    function initMap() {
      var centerOfMap = new google.maps.LatLng(
        22.427095946682467,
        79.92415996874999
      );

      var options = {
        center: centerOfMap, //Set center.
        zoom: 7, //The zoom value.
      };
      map = new google.maps.Map(document.getElementById("map"), options);
      google.maps.event.addListener(map, "click", function (event) {
        var clickedLocation = event.latLng;
        if (marker === false) {
          marker = new google.maps.Marker({
            position: clickedLocation,
            map: map,
            draggable: true, //make it draggable
          });
          google.maps.event.addListener(marker, "dragend", function (event) {
            markerLocation();
          });
        } else {
          marker.setPosition(clickedLocation);
        }
        markerLocation();
      });
    }
    function markerLocation() {
      var currentLocation = marker.getPosition();
      console.log(currentLocation);
    }
    initMap();
  }
}
