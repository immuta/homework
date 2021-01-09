import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, popup } from 'leaflet';
import { ApiService } from '../api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mostPopulatedCountries: any[];
  countriesWithMostNeighbors: any[];

  mapOptions = {
    layers: [
      tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          zIndex: 100,
        }),
    ],
    zoom: 3,
    center: latLng(0, 0),
  };

  layers = [];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    forkJoin({
      mostNeighbors: this.api.getCountriesWithMostNeighbors(),
      mostPopulated: this.api.getMostPopulatedCountries(),
    }).subscribe(response => {
      const {mostNeighbors, mostPopulated} = response;
      this.mostPopulatedCountries = mostPopulated;
      this.countriesWithMostNeighbors = mostNeighbors;
    }, error => {
      console.log(error);
    });
  }

  showMapPopup(country: any, type: 'MOST_POPULATED' | 'MOST_NEIGHBORS'): void {
    const countryPopup = popup();
    let caption;
    if (type === 'MOST_POPULATED') {
      caption = `${country.name} has a population of ${country.population} people`;
    } else {
      caption = `${country.name} borders ${country.borders.length} other countries`;
    }
    countryPopup.setLatLng(country.latlng);
    countryPopup.setTooltipContent(country.name);
    countryPopup.setPopupContent(country.name);
    countryPopup.setContent(`
      <h4>${country.name}</h4>
      <div>${caption}</div>
    `);
    this.layers = [
      countryPopup,
    ];
  }

  clearMapPopups(): void {
    this.layers = [];
  }
}
