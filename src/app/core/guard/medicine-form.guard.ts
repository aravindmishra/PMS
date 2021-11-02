import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MedicineService } from '../../components/medicine/services/medicine.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineFormGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private medicineService:MedicineService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.medicineService.medicineForm.dirty && this.medicineService.submitState == "Save" && !this.medicineService.routerState) {
      let state = confirm("Are you sure to discard changes?") ? true : false;
      return state;
    }
    return true;
  }
  
}
