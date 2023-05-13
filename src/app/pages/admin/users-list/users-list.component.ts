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
import { UniversityEditCreateComponent } from 'src/app/components/university-edit-create/university-edit-create.component';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { UserEditCreateComponent } from 'src/app/components/user-edit-create/user-edit-create.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [fadeAnimation],
})
export class UsersListComponent implements OnInit {

  public isLoading: boolean = false;

  public users: User[] = [];

  public count: number = 5;

  public currentPage: number = 0;

  public filters: Filters = {
    limit: 5,
    skip: 0
  }

  public searchControl: FormControl = this.fb.control('', { updateOn: 'blur' });
  
  constructor(private userService: UserService, private fb: FormBuilder, private dialog: MatDialog, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.findAllUsers()
    this.listenSearchControl();
  }

  private listenSearchControl(): void {
    this.searchControl.valueChanges.subscribe({
      next: (value) => {
        this.setFiltersSearch(value);
        this.findAllUsers();
      },
    });
  }

  private findAllUsers(): void {
    this.isLoading = true;

    this.userService.findAllUsers(this.filters).subscribe({
      next: (res: any) => {
        this.users = res.items;
        this.count = res.count;
        
        setTimeout(() => this.isLoading = false, 200)
      },
    });
  }

  public createUser(): void{
    this.dialog.open(UserEditCreateComponent, {
      width: '600px',
      data: {
        header: 'Create user',
      }
    }).afterClosed().subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public handleOnClose(res: any): void{
    if(res) {
      this.findAllUsers()
    }
  }

  public editUser(item: User): void{
    this.dialog.open(UserEditCreateComponent, {
      width: '600px',
      data: {
        header: 'Edit user',
        item: item
      }
    }).afterClosed().subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public deleteUser(item:User): void{
    this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        header: "Are you sure you want to delete user?"
      }
    }).afterClosed().subscribe({
      next: (res) => {
        if(res) {
          this.userService.delete(item._id).subscribe({
            next: () => {
              this.snackbarService.openSnack(true, 'Successfuly deleted!');
              this.findAllUsers()
            },
            error: () => this.findAllUsers()
          })
        }
      }
    })
  }

  public setFiltersSearch(value: string): void{
    this.filters.filter = value ? ('email:' + value) : null;
  }

  public setFiltersSkip(): void{
    this.filters.skip = this.filters.limit * this.currentPage;
  }

  public handlePageEvent(event: PageEvent): void{
    this.currentPage = event.pageIndex;
    this.filters.limit = event.pageSize;

    this.setFiltersSkip();
    this.findAllUsers();
  }
}
