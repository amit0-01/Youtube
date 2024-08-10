import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup | any;

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService, 
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.username
      const password = this.loginForm.value.password
      
      this.loginService.signIn(email, password).subscribe((result:any) => {

        localStorage.setItem('userData', JSON.stringify(result.data));
        this.router.navigate(['home'])

      })
    }
  }
}
