import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datainterface } from './getdata';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postData(data:any){
    return this.http.post<any>('https://reqres.in/api/users/', data);
  }
  getData(){
    return this.http.get<any>('https://reqres.in/api/users?per_page=400')
  }
  putData(data:any,id:number){
    return this.http.put<any>('https://reqres.in/api/users/'+ 
    id, data)
  }

  delete(id:number){
    return this.http.delete<any>('https://reqres.in/api/users/'+ id)
  }
}