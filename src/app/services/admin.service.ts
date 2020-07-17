import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  // url: String = "http://localhost:3000/";
  url: String = "https://api.sftservices.com/";
  constructor(private http: HttpClient) {}
  //Broadcaster ------------------------------------
  private stateData = new BehaviorSubject<any>(null);
  public stateData$ = this.stateData.asObservable();
  private citiesData = new BehaviorSubject<any>(null);
  public citiesData$ = this.citiesData.asObservable();
  private addressData = new BehaviorSubject<any>(null);
  public addressData$ = this.addressData.asObservable();
  private areasData = new BehaviorSubject<any>(null);
  public areasData$ = this.areasData.asObservable();
  //--------------------------------------------------

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  });
  options = { headers: this.headers };

  getTestList(): Observable<any> {
    return this.http
      .get<any>(this.url + "tests/indvidualtest",this.options)
      .pipe(catchError(this.handleError<any>("getTestList", {})));
  }
  getProfileTest(): Observable<any> {
    return this.http
      .get<any>(this.url + "tests/profiletest",this.options)
      .pipe(catchError(this.handleError<any>("getProfileTestList", {})));
  }

  getPackages(): Observable<any> {
    return this.http
      .get<any>(this.url + "tests/packagetest",this.options)
      .pipe(catchError(this.handleError<any>("getProfileTestList", {})));
  }

  saveSingleTest(data: any): Observable<any> {
    return this.http
      .post<any>(this.url + "tests/indvidualtest", data, this.options)
      .pipe(catchError(this.handleError<any>("saveSingleTest", {})));
  }

  saveProfileTest(data: any): Observable<any> {
    return this.http
      .post<any>(this.url + "tests/profiletest", data, this.options)
      .pipe(catchError(this.handleError<any>("saveProfileTest", {})));
  }
  savePackage(data): Observable<any> {
    return this.http
      .post<any>(this.url + "tests/packagetest", data, this.options)
      .pipe(catchError(this.handleError<any>("saveProfileTest", {})));
  }

  //location calls

  saveState(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/locations/add-state", data, this.options)
      .pipe(catchError(this.handleError<any>("LocationSaveError", {})));
  }
  saveCity(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/locations/add-city", data, this.options)
      .pipe(catchError(this.handleError<any>("LocationSaveError", {})));
  }
  saveAddress(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/locations/add-address", data, this.options)
      .pipe(catchError(this.handleError<any>("LocationSaveError", {})));
  }
  saveArea(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/locations/add-area", data, this.options)
      .pipe(catchError(this.handleError<any>("LocationSaveError", {})));
  }

  saveLatLng(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/locations/add-latlng", data, this.options)
      .pipe(catchError(this.handleError<any>("LocationSaveError", {})));
  }

  //get
  getStates(): Observable<any> {
    return this.http.get<any>(this.url + "api/locations/get-states",this.options);

    // .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getCity(data): Observable<any> {
    return this.http
      .post<any>(
        this.url + "api/locations/get-citiesByState",
        data,
        this.options
      )
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getCities(): Observable<any> {
    return this.http
      .post<any>(this.url + "api/locations/get-cities", this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getAddress(): Observable<any> {
    return this.http
      .post<any>(this.url + "api/locations/get-address", this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getAddressByStateCity(data): Observable<any> {
    return this.http
      .post<any>(
        this.url + "api/locations/get-addressByStateCity",
        data,
        this.options
      )
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getArea(): Observable<any> {
    return this.http
      .post<any>(this.url + "api/locations/get-areas", this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }

  getLatLng(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/locations/get-latlng", data, this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }

  //medecines
  getAllMedecines(): Observable<any> {
    return this.http
      .get<any>(this.url + "getallmedicines", this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }

  //corporate
  addCorporate(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/corporate/save", data, this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getAllCorporate(): Observable<any> {
    return this.http
      .get<any>(this.url + "api/corporate/get-all", this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }

  addBranch(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/corporate/branch/save", data, this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  addDepartment(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/corporate/department/save", data, this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getAllBranches(): Observable<any> {
    return this.http
      .get<any>(this.url + "api/corporate/branch/get-all", this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getAllDepartment(): Observable<any> {
    return this.http
      .get<any>(this.url + "api/corporate/department/get-all", this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getBranchesByCorporate(data): Observable<any> {
    return this.http
      .post<any>(
        this.url + "api/corporate/branch/by-corporate",
        data,
        this.options
      )
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }

  getDepartmentByCorporate(data): Observable<any> {
    return this.http
      .post<any>(
        this.url + "api/corporate/department/by-corporate",
        data,
        this.options
      )
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getTemperatures(): Observable<any> {
    return this.http.get<any>(
      this.url + "api/temperature/get-all",
      this.options
    );
  }
  getTemperatureByBranch(data): Observable<any> {
    return this.http
      .post<any>(this.url + "api/temperature/emp-temp", data, this.options)
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }

  getTemperatureByDate(data): Observable<any> {
    return this.http
      .post<any>(
        this.url + "api/temperature/emp-temp-by-date",
        data,
        this.options
      )
      .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }

  saveWeeklySettings(data){
    return this.http
    .post<any>(
      this.url + "api/weekly-question/save",
      data,
      this.options
    )
    .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }

  addCorporateHR(data){
    return this.http
    .post<any>(
      this.url + "api/corporate/hr/save",
      data,
      this.options
    )
    .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }

  getCorporateHr(data){
    return this.http
    .post<any>(
      this.url + "api/corporate/hr/get-all",
      data,
      this.options
    )
    .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  getWeeklySettings(){
    return this.http
    .get<any>(
      this.url + "api/weekly-question/get",
      this.options
    )
    .pipe(catchError(this.handleError<any>("getLocationError", {})));
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  setStatesData(data) {
    this.stateData.next(data);
  }

  setCitiesData(data) {
    this.citiesData.next(data);
  }
  setAddressData(data) {
    this.addressData.next(data);
  }

  setAreaData(data) {
    this.areasData.next(data);
  }
}
