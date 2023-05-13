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
import { University } from 'src/app/interfaces/university.interface';
import { UniversityService } from 'src/app/services/university.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-university-edit-create',
  templateUrl: './university-edit-create.component.html',
  styleUrls: ['./university-edit-create.component.scss'],
})
export class UniversityEditCreateComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public university: University = this.data['item'] || ({} as University);

  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public ref: MatDialogRef<UniversityEditCreateComponent>,
    private universityService: UniversityService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.university && this.university?._id) {
      this.getUniversityById(this.university?._id);
    }

    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(180),
      ]),
      address: this.fb.control('', [
        Validators.required,
        Validators.maxLength(180),
      ]),
      rector: this.fb.control('', [
        Validators.required,
        Validators.maxLength(180),
      ]),
      logoImage: this.fb.control('', [
        Validators.required
      ]),
      coordinates: this.fb.control('', [Validators.required])
    });
  }


  public getUniversityById(id: string): void {
    this.isLoading = true;

    this.universityService.findById(id).subscribe({
      next: (res: University) => {
        this.university = res;

        this.form.patchValue({
          name: res.name,
          address: res.address,
          rector: res.rector,
          coordinates: res.coordinates.join(','),
          logoImage: res.logoImage
        });

        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
      },
    });
  }

  public saveUniversity(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this.form.disable();

    if (this.university && this.university._id) {
      this.updateUniversity();
    } else {
      this.createUniversity();
    }
  }

  public updateUniversity(): void {
    this.universityService
      .update(this.university._id, toFormDataHelper(this.form.value))
      .subscribe({
        next: () => this.handleSuccess('Successfully updated!'),
        error: () => this.handleError('Error during update!'),
      });
  }

  public createUniversity(): void {
    this.universityService.create(toFormDataHelper(this.form.value)).subscribe({
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
