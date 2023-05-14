import { Component, OnInit } from '@angular/core';
import { HostelService } from 'src/app/services/hostel.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Hostel } from 'src/app/interfaces/hostel.interface';

import { fadeAnimation } from 'src/app/animations/fade.animation';
import { Filters } from 'src/app/interfaces/filters.interface';
import {
  latLng,
  tileLayer,
  marker,
  divIcon,
  DivIcon,
  Point,
  LatLng,
} from 'leaflet';
import { UniversityService } from 'src/app/services/university.service';
import { University } from 'src/app/interfaces/university.interface';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [fadeAnimation],
})
export class HomepageComponent implements OnInit {
  public readonly DEFAULT_IMAGE: string =
    'https://cid.center/wp-content/uploads/2020/11/placeholder.png';

  private readonly ITEMS_TO_SHOW = 4;

  public currentPage: number = 0;

  public filters: Filters = {
    limit: this.ITEMS_TO_SHOW,
    skip: this.ITEMS_TO_SHOW * this.currentPage,
  };

  public searchControl: FormControl = this.fb.control('', { updateOn: 'blur' });

  public universityControl: FormControl = this.fb.control('', {
    updateOn: 'blur',
  });

  public hostels: Hostel[] = [];

  public universities: University[] = [];

  public count: number = this.ITEMS_TO_SHOW;

  public isLoading: boolean = true;

  public mapOptions = {
    layers: [
      tileLayer(
        'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=FLZjrggiEUkOsMhDShR0',
        {
          maxZoom: 18,
          attribution: '...',
        }
      ),
    ],
    zoom: 7,
    center: latLng(48.53, 25.05),
  };

  public markers: any[] = [];

  constructor(
    private hostelService: HostelService,
    private universityService: UniversityService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findAllHostels();
    this.findAllUniversities();
    this.listenSearchControl();

    this.route.queryParams.subscribe({
      next: (value: Params) => {
        if (value && value['university']) {
          this.universityControl.patchValue(value['university']);
        }
      },
    });
  }

  private listenSearchControl(): void {
    this.searchControl.valueChanges.subscribe({
      next: (value) => {
        this.resetPagination();
        this.universityControl.setValue('', { emitEvent: false });
        this.setFilter('name', value);
        this.findAllHostels(true);
      },
    });

    this.universityControl.valueChanges.subscribe({
      next: (value) => {
        this.resetPagination();
        this.searchControl.setValue('', { emitEvent: false });
        this.setFilter('university', value);
        this.findAllHostels(true);
      },
    });
  }

  private findAllUniversities(): void {
    this.universityService
      .findAllUniversities({ limit: 0, skip: 0 })
      .subscribe({
        next: (res) => {
          this.universities = res.items;
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
        this.setMapCenter();
        setTimeout(() => (this.isLoading = false), 200);
      },
    });
  }

  public setMapCenter(): void {
    if (this.hostels.length) {
      this.mapOptions.center = latLng(
        +this.hostels[0].coordinates[0],
        +this.hostels[0].coordinates[1]
      );
    }
    else {
      this.mapOptions.center = latLng(48.53, 25.05)
    }
  }

  public generateMarkers(): void {
    this.markers = [];

    this.hostels.forEach((hostel: Hostel) => {
      const latLang = new LatLng(
        +hostel.coordinates[0],
        +hostel.coordinates[1]
      );

      this.markers.push(
        marker(latLang, {
          icon: this.getIcon(hostel),
          title: hostel.name,
        })
      );
    });
  }

  private getIcon(hostel: Hostel): DivIcon {
    return divIcon({
      html: `<div class="map-pin__child" style="border-color:${hostel.pointColor}"><i style="background-color: ${hostel.pointColor}"></i></div>`,
      iconAnchor: [13.5, 25],
      className: 'map-pin',
    });
  }

  public onLoadMore(): void {
    this.currentPage += 1;

    this.setPagination();
    this.findAllHostels();
  }

  public setPagination(): void {
    this.filters.skip = this.ITEMS_TO_SHOW * this.currentPage;
  }

  public resetPagination(): void {
    this.currentPage = 0;

    this.setPagination();
  }

  public setFilter(key: string, value: string): void {
    this.filters.filter = value ? `${key}:` + value : null;
  }
}
