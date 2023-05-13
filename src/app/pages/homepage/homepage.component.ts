import { Component, OnInit } from '@angular/core';
import { HostelService } from 'src/app/services/hostel.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Hostel } from 'src/app/interfaces/hostel.interface';

import { fadeAnimation } from 'src/app/animations/fade.animation';
import { Filters } from 'src/app/interfaces/filters.interface';
import { latLng, tileLayer, marker, divIcon, DivIcon, Point, LatLng } from 'leaflet';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [fadeAnimation],
})
export class HomepageComponent implements OnInit {
  public readonly DEFAULT_IMAGE: string =
    'https://cid.center/wp-content/uploads/2020/11/placeholder.png';

  private readonly ITEMS_TO_SHOW = 5;

  public currentPage: number = 0;

  public filters: Filters = {
    limit: this.ITEMS_TO_SHOW,
    skip: this.ITEMS_TO_SHOW * this.currentPage,
  };

  public searchControl: FormControl = this.fb.control('', { updateOn: 'blur' });

  public hostels: Hostel[] = [];

  public count: number = this.ITEMS_TO_SHOW;

  public isLoading: boolean = true;

  public mapOptions = {
    layers: [
      tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=FLZjrggiEUkOsMhDShR0', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: latLng(48.53, 25.05),
  };

  public markers: any[] = [];

  constructor(private hostelService: HostelService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.findAllHostels();
    this.listenSearchControl();
  }

  private listenSearchControl(): void {
    this.searchControl.valueChanges.subscribe({
      next: (value) => {
        this.resetFiltersSkip();
        this.setFiltersSearch(value);
        this.findAllHostels(true);
      },
    });
  }

  private findAllHostels(reset: boolean = false): void {
    this.isLoading = true;

    this.hostelService.findAllHostels(this.filters).subscribe({
      next: (res) => {
        this.hostels = reset ? res.items : [...this.hostels, ...res.items];
        this.count = res.count;

        this.generateMarkers();

        setTimeout(() => (this.isLoading = false), 200);
      },
    });
  }

  public generateMarkers():void{
    this.markers = [];

    this.hostels.forEach((hostel: Hostel) => {
      const latLang = new LatLng(+hostel.coordinates[0], +hostel.coordinates[1]);

      this.markers.push(marker(latLang, {
        icon: this.getIcon(hostel),
        title: hostel.name
      }))
    })
  }

  private getIcon(hostel: Hostel): DivIcon {
    return divIcon({
      html: `<div class="map-pin__child" style="border-color:${hostel.pointColor}"><i style="background-color: ${hostel.pointColor}"></i></div>`,
      iconAnchor: [13.5, 25],
      className: "map-pin"
  });
  }

  public onLoadMore(): void {
    this.currentPage += 1;

    this.setFiltersSkip();
    this.findAllHostels();
  }

  public setFiltersSkip(): void {
    this.filters.skip = this.ITEMS_TO_SHOW * this.currentPage;
  }

  public resetFiltersSkip(): void {
    this.currentPage = 0;

    this.setFiltersSkip();
  }

  public setFiltersSearch(value: string): void {
    this.filters.filter = value ? 'name:' + value : null;
  }
}
