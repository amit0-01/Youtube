import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { YoutubehomeService } from 'src/app/common/services/youtubehome.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm!: FormGroup;
  avatarFile: File | null = null;
  coverImageFile: File | null = null;
  avatarError: boolean = false;

  constructor(private fb: FormBuilder, 
    private service: YoutubehomeService,
    private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onFileSelected(event: Event, field: string): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0] || null;

    if (field === 'avatar') {
      this.avatarFile = file;
      this.avatarError = !file; // Set error if file is not selected
    } else if (field === 'coverImage') {
      this.coverImageFile = file;
    }
  }

  onSubmit(): void {
    if (this.signupForm.invalid || this.avatarError) {
      return;
    }

    const formData = new FormData();
    formData.append('fullname', this.signupForm.get('fullname')?.value);
    formData.append('email', this.signupForm.get('email')?.value);
    formData.append('username', this.signupForm.get('username')?.value);
    formData.append('password', this.signupForm.get('password')?.value);

    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile);
    }

    if (this.coverImageFile) {
      formData.append('coverImage', this.coverImageFile);
    }

    
    this.service.register(formData).subscribe((res:any)=>{
      if(res.success){
        alert('Register Successfully, Please Login')
        this.router.navigate([""]);
      }
      
    })
  }

}
