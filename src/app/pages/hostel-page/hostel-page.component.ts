import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DivIcon, LatLng, divIcon, latLng, marker, tileLayer } from 'leaflet';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Hostel } from 'src/app/interfaces/hostel.interface';
import { HostelService } from 'src/app/services/hostel.service';

@Component({
  selector: 'app-hostel-page',
  templateUrl: './hostel-page.component.html',
  styleUrls: ['./hostel-page.component.scss'],
})
export class HostelPageComponent implements OnInit {
  public hostel: Hostel = {} as Hostel;

  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    items: 1,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1400,
    margin: 15,
    navText: ['&#8249;', '&#8250;'],
    nav: true
  }

  public mapOptions: any = {};

  public markers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private hostelService: HostelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (value: Params) => {
        if (value && value['id']) {
          this.getHostel(value['id']);
        }
      },
    });
  }

  public getHostel(id: string): void {
    this.hostelService.findById(id).subscribe({
      next: (hostel: Hostel) => {
        this.hostel = hostel;
        this.setMapOptions();
        this.generateMarkers();
      },
      error: () => this.router.navigate(['/']),
    });
  }

  public generateMarkers():void{
    this.markers = [];

    const latLang = new LatLng(+this.hostel.coordinates[0], +this.hostel.coordinates[1]);

    this.markers.push(marker(latLang, {
      icon: this.getIcon(this.hostel),
      title: this.hostel.name
    }))
  }

  private getIcon(hostel: Hostel): DivIcon {
    return divIcon({
      html: `<div class="map-pin__child" style="border-color:${hostel.pointColor}"><i style="background-color: ${hostel.pointColor}"></i></div>`,
      iconAnchor: [13.5, 25],
      className: "map-pin"
    });
  }

  public setMapOptions(): void{
    this.mapOptions = {
      layers: [
        tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=FLZjrggiEUkOsMhDShR0', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      zoom: 8,
      center: latLng(+this.hostel.coordinates[0], +this.hostel.coordinates[1]),
    };
  }  
}
