import { Component, OnInit } from '@angular/core';
import { HostelService } from 'src/app/services/hostel.service';
import {
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Hostel } from 'src/app/interfaces/hostel.interface';

import { fadeAnimation } from 'src/app/animations/fade.animation';
import { Filters } from 'src/app/interfaces/filters.interface';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { HostelEditCreateComponent } from 'src/app/components/hostel-edit-create/hostel-edit-create.component';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-hostels-list',
  templateUrl: './hostels-list.component.html',
  styleUrls: ['./hostels-list.component.scss'],
  animations: [fadeAnimation],
})
export class HostelsListComponent implements OnInit {

  public isLoading: boolean = false;

  public hostels: Hostel[] = [];

  public count: number = 5;

  public currentPage: number = 0;

  public filters: Filters = {
    limit: 5,
    skip: 0
  }

  public searchControl: FormControl = this.fb.control('', { updateOn: 'blur' });
  
  constructor(private hostelService: HostelService, private fb: FormBuilder, private dialog: MatDialog, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.findAllHostels()
    this.listenSearchControl();
  }

  private listenSearchControl(): void {
    this.searchControl.valueChanges.subscribe({
      next: (value) => {
        this.setFiltersSearch(value);
        this.findAllHostels();
      },
    });
  }

  private findAllHostels(): void {
    this.isLoading = true;

    this.hostelService.findAllHostels(this.filters).subscribe({
      next: (res) => {
        this.hostels = res.items;
        this.count = res.count;
        
        setTimeout(() => this.isLoading = false, 200)
      },
    });
  }

  public createHostel(): void{
    this.dialog.open(HostelEditCreateComponent, {
      width: '600px',
      data: {
        header: 'Create hostel',
      }
    }).afterClosed().subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public handleOnClose(res: any): void{
    if(res) {
      this.findAllHostels()
    }
  }

  public editHostel(hostel: Hostel): void{
    this.dialog.open(HostelEditCreateComponent, {
      width: '600px',
      data: {
        header: 'Edit hostel',
        hostel: hostel
      }
    }).afterClosed().subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public deleteHostel(hostel:Hostel): void{
    this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        header: "Are you sure you want to delete: '" + hostel.name + "' ?"
      }
    }).afterClosed().subscribe({
      next: (res) => {
        if(res) {
          this.hostelService.delete(hostel._id).subscribe({
            next: () => {
              this.snackbarService.openSnack(true, 'Successfuly deleted!');
              this.findAllHostels()
            },
            error: () => this.findAllHostels()
          })
        }
      }
    })
  }

  public setFiltersSearch(value: string): void{
    this.filters.filter = value ? ('name:' + value) : null;
  }

  public setFiltersSkip(): void{
    this.filters.skip = this.filters.limit * this.currentPage;
  }

  public handlePageEvent(event: PageEvent): void{
    this.currentPage = event.pageIndex;
    this.filters.limit = event.pageSize;

    this.setFiltersSkip();
    this.findAllHostels();
  }
}
