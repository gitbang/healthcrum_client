import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PatientAuthService {
  canLoad(
    route: import("@angular/router").Route,
    segments: import("@angular/router").UrlSegment[]
  ): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem("user") != null) return true;
    else return false;
  }
  constructor() {}
}
