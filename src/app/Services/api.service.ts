import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../Modal/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiurl = 'https://61948de29b1e780017ca1fe2.mockapi.io/api/users'; // API endpoint

  constructor(private http: HttpClient) { }

  // Get all data
  LoadUser(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.apiurl);
  }

  // create a new user
  SaveUser(customedata: any) : Observable<any>{
    return this.http.post<any>(this.apiurl , customedata);
  }

  // update a existing user
  LoadUserbycode(id: any) : Observable<any>{
    return this.http.get<any>(this.apiurl + '/' + id);
  }
  
  updateData(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, data);
  }
  // delete a user
  RemoveUser(id: any) : Observable<any>{
    return this.http.delete<any>(this.apiurl + '/' + id);
  }
}
