import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import toFormDataHelper from 'src/app/helpers/to-form-data.helper';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit-create',
  templateUrl: './user-edit-create.component.html',
  styleUrls: ['./user-edit-create.component.scss'],
})
export class UserEditCreateComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public user: User = this.data['item'] || ({} as User);

  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public ref: MatDialogRef<UserEditCreateComponent>,
    private userService: UserService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.user && this.user?._id) {
      this.getUserById(this.user?._id);
    }

    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      firstName: this.fb.control('', [
        Validators.required,
        Validators.maxLength(180),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.maxLength(180),
      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
      ]),
      birthDate: this.fb.control('', [
        Validators.required
      ]),
      password: this.fb.control(null, [Validators.minLength(5), ...(!this.user ? [Validators.required] : [])])
    });
  }


  public getUserById(id: string): void {
    this.isLoading = true;

    this.userService.findById(id).subscribe({
      next: (res: User) => {
        this.user = res;

        this.form.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          birthDate: new Date(res.birthDate)
        });

        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
      },
    });
  }

  public saveUser(): void {
    console.log(this.form.get('password')?.errors);
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this.form.disable();

    if (this.user && this.user._id) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  public updateUser(): void {
    this.userService
      .update(this.user._id, toFormDataHelper(this.form.value))
      .subscribe({
        next: () => this.handleSuccess('Successfully updated!'),
        error: () => this.handleError('Error during update!'),
      });
  }

  public createUser(): void {
    this.userService.create(toFormDataHelper(this.form.value)).subscribe({
      next: () => this.handleSuccess('Successfully created!'),
      error: () => this.handleError('Error during create!'),
    });
  }

  public handleSuccess(msg: string): void {
    this.form.enable();
    this.ref.close(true);
    this.showMessage(true, msg);
  }

  public handleError(msg: string): void {
    this.form.enable();
    this.showMessage(false, msg);
  }

  public cancel(): void {
    this.ref.close();
  }

  public showMessage(isSuccess: boolean, msg: string): void {
    if (isSuccess) {
      this.snackbarService.openSnack(true, msg);
    }
  }
}
