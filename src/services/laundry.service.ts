import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Laundry} from 'src/models/laundry';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {

  constructor(private http:HttpClient) { }

  getLaundryData() {
    return this.http.get<Laundry[]>('http://192.168.0.54:3000/machine_info/').pipe(map((res) => {
      return res
    }));
  }

 
}
