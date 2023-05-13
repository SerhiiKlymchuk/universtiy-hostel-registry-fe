import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
} from '@angular/forms';

import { fadeAnimation } from 'src/app/animations/fade.animation';
import { Filters } from 'src/app/interfaces/filters.interface';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UniversityService } from 'src/app/services/university.service';
import { University } from 'src/app/interfaces/university.interface';
import { UniversityEditCreateComponent } from 'src/app/components/university-edit-create/university-edit-create.component';

@Component({
  selector: 'app-universities-list',
  templateUrl: './universities-list.component.html',
  styleUrls: ['./universities-list.component.scss'],
  animations: [fadeAnimation],
})
export class UniversitiesListComponent implements OnInit {

  public isLoading: boolean = false;

  public universities: University[] = [];

  public count: number = 5;

  public currentPage: number = 0;

  public filters: Filters = {
    limit: 5,
    skip: 0
  }

  public searchControl: FormControl = this.fb.control('', { updateOn: 'blur' });
  
  constructor(private universitiesService: UniversityService, private fb: FormBuilder, private dialog: MatDialog, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.findAllUniversities()
    this.listenSearchControl();
  }

  private listenSearchControl(): void {
    this.searchControl.valueChanges.subscribe({
      next: (value) => {
        this.setFiltersSearch(value);
        this.findAllUniversities();
      },
    });
  }

  private findAllUniversities(): void {
    this.isLoading = true;

    this.universitiesService.findAllUniversities(this.filters).subscribe({
      next: (res) => {
        this.universities = res.items;
        this.count = res.count;
        
        setTimeout(() => this.isLoading = false, 200)
      },
    });
  }

  public createUniversity(): void{
    this.dialog.open(UniversityEditCreateComponent, {
      width: '600px',
      data: {
        header: 'Create university',
      }
    }).afterClosed().subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public handleOnClose(res: any): void{
    if(res) {
      this.findAllUniversities()
    }
  }

  public editUniversity(item: University): void{
    this.dialog.open(UniversityEditCreateComponent, {
      width: '600px',
      data: {
        header: 'Edit university',
        item: item
      }
    }).afterClosed().subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public deleteUniversity(item:University): void{
    this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        header: "Are you sure you want to delete: '" + item.name + "' ?"
      }
    }).afterClosed().subscribe({
      next: (res) => {
        if(res) {
          this.universitiesService.delete(item._id).subscribe({
            next: () => {
              this.snackbarService.openSnack(true, 'Successfuly deleted!');
              this.findAllUniversities()
            },
            error: () => this.findAllUniversities()
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
    this.findAllUniversities();
  }
}
