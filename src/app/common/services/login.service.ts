import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { apiUrl } from 'src/constant';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string) {
    const user = { email, password };
    const url = `${apiUrl}/api/v1/users/login`;
    return this.http.post(url, user).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
