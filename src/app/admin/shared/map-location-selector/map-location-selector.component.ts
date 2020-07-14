import { Component, OnInit, Inject } from "@angular/core";
import * as $ from "jquery";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpClient } from "@angular/common/http";
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
  public lang: number;
  public long: number;

  constructor(
    private dialogRef: MatDialogRef<MapLocationSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient: HttpClient
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
            var currentLocation = marker.getPosition();
            // this.getAddressDetails(
            //    currentLocation.lat(),
            //   currentLocation.lng()
            // );
          });
        } else {
          marker.setPosition(clickedLocation);
        }
        markerLocation();
      });
    }
    function markerLocation() {
      var currentLocation = marker.getPosition();

      console.log(currentLocation.lat(), currentLocation.lng());
    }
    initMap();
  }

  public getAddressDetails(lat, long) {
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=ef023180e56342a193ff4b658e2f02dd`;
    this.httpClient.get(url).subscribe((res) => {
      console.log(res);
    });
  }
}
