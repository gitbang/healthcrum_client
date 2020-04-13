import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CompanyApiService {
  constructor(private httpClient: HttpClient) {}

  getEmployeesDetails(): any {
    return this.httpClient.get("https://jsonplaceholder.typicode.com/users");
  }
}
