import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  // baseURL: string = "http://localhost/time-map-branch2/drg-timemap/timemap/src/app/api/";
  baseURL: string = "http://localhost/drg-timemap/timemap/src/app/api/";
  // baseURL: string = "/api/";
  constructor(private http:HttpClient) { }

  getAllLocations() {
    return this.http.get(this.baseURL + "getAllLocations.php");
  }

  getLocationFromId(Id: number) {
    return this.http.get(this.baseURL + "getLocationFromId.php?ID=" + Id);
  }
}
