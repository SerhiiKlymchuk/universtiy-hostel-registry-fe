import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import toFormDataHelper from 'src/app/helpers/to-form-data.helper';
import { Hostel } from 'src/app/interfaces/hostel.interface';
import { University } from 'src/app/interfaces/university.interface';
import { HostelService } from 'src/app/services/hostel.service';
import { UniversityService } from 'src/app/services/university.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-hostel-edit-create',
  templateUrl: './hostel-edit-create.component.html',
  styleUrls: ['./hostel-edit-create.component.scss'],
})
export class HostelEditCreateComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public hostel: Hostel = this.data['hostel'] || ({} as Hostel);

  public isLoading: boolean = false;

  public universities: University[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: MatDialogRef<HostelEditCreateComponent>,
    private hostelService: HostelService,
    private universityService: UniversityService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.hostel && this.hostel?._id) {
      this.getHostelById(this.hostel?._id);
    }

    this.createForm();
    this.findAllUniversities();
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
      pointColor: this.fb.control('#dcdcdc', [Validators.required]),
      coordinates: this.fb.control('', [Validators.required]),
      photos: this.fb.control([]),
      university: this.fb.control('', [Validators.required]),
    });
  }

  public findAllUniversities(): void {
    this.universityService
      .findAllUniversities({ limit: 50, skip: 0 })
      .subscribe({
        next: (res: any) => {
          this.universities = res.items || [];
        },
      });
  }

  public getHostelById(id: string): void {
    this.isLoading = true;

    this.hostelService.findById(id).subscribe({
      next: (res: Hostel) => {
        this.hostel = res;

        this.form.patchValue({
          name: res.name,
          address: res.address,
          pointColor: res.pointColor,
          coordinates: res.coordinates.join(','),
          photos: [],
          university: res.university?._id,
        });

        this.mapPhotosAsync(res.photos);

        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
      },
    });
  }

  public saveHostel(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this.form.disable();

    if (this.hostel && this.hostel._id) {
      this.updateHostel();
    } else {
      this.createHostel();
    }
  }

  public updateHostel(): void {
    this.hostelService
      .update(this.hostel._id, this.getFormDataBody())
      .subscribe({
        next: () => this.handleSuccess('Successfully updated!'),
        error: () => this.handleError('Error during update!'),
      });
  }

  public createHostel(): void {
    this.hostelService.create(this.getFormDataBody()).subscribe({
      next: () => this.handleSuccess('Successfully created!'),
      error: () => this.handleError('Error during create!'),
    });
  }

  public getFormDataBody(): FormData {
    const body = this.form.value;
    const photos = body.photos;
    const coordinates = body.coordinates.split(',');

    delete body.photos;
    delete body.coordinates;

    const formData = toFormDataHelper(body);


    if (photos.length) {
      photos.forEach((p: any) => {
        formData.append('photos', p as Blob, p?.name);
      });
    } else {
      formData.append('photos', '');
    }

    if(coordinates.length) {
      coordinates.forEach((c: any) => {
        formData.append('coordinates', c.trim());
      });
    }
    else {
      formData.append('coordinates', '');
    }

    return formData;
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
      // this.
      this.snackbarService.openSnack(true, msg);
    }
  }

  public mapPhotosAsync(images: string[]) {
    images.forEach(async (image) => {
      const file = await this.getFileFromUrl(image, 'image');
      this.readFileAndAdd(file);
    });
  }

  public async getFileFromUrl(url: string, defaultType = 'image/jpeg') {
    const response = await fetch(url);

    const name = response.url.split('.').join('').split('/').at(-1) || 'image';
    const data = await response.blob();

    return new File([data], name, {
      type: data.type || defaultType,
    });
  }

  public removePhoto(imgToDelete: any): void {
    const photos = this.form.get('photos')?.value || [];
    const newPhotos = photos.filter((img: any) => img != imgToDelete);

    this.form.get('photos')?.patchValue(newPhotos);
  }

  public onFileSelect(event: any): void {
    const file = event && event.item(0);

    if (file) {
      this.readFileAndAdd(file);
    }
  }

  public readFileAndAdd(file: any): void {
    const photos = this.form.get('photos')?.value || [];
    this.form.get('photos')?.patchValue([...photos, file]);
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.onFileSelect(event);
  }
}
