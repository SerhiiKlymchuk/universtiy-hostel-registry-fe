import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import toFormDataHelper from 'src/app/helpers/to-form-data.helper';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public isLoading: boolean = false;
  
  public form: FormGroup = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  public onSubmit(event: any): void{
    this.form.markAllAsTouched();

    if(!this.form.valid) return;
    
    this.isLoading = true;
    this.form.disable();

    this.authService.login(toFormDataHelper(this.form.value)).subscribe({
      next: () => {
        this.router.navigate(['/admin/hostels']);
      },
      error: () => {
        this.form.enable();
        this.isLoading = false;
        this.form.get('password')?.setErrors({invalid: true});
      }
    })
  }
}
