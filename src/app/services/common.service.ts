import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public LOADING:boolean = false;

  constructor(private http:HttpClient,  private router:Router, private toastr: ToastrService) { 
  }

  public redirect(url:string)
  {
    (url)?this.router.navigate([url]):null
  }

  public post(url:string,requestData?)
  {
    // let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this.http.post(url,requestData);
  }

  public successMessage(message:string) {
    this.toastr.success("success", message,{
      timeOut: 3000,
    });
  }

  public warningMessage(message:string) {
    this.toastr.warning("error", message, {
      timeOut: 3000,
    });
  }

  public errorMessage(message:string) {
    this.toastr.error("error", message, {
      timeOut: 3000,
    });
  }

  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
