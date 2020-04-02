import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AdminrouteService implements CanLoad {
  canLoad(
    route: import("@angular/router").Route,
    segments: import("@angular/router").UrlSegment[]
  ): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  constructor() {}
}
