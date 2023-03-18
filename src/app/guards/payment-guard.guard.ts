import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuardGuard implements CanActivate {
  constructor(private toastrService:ToastrService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem("endDate") && localStorage.getItem("startDate")) {
      return true;
    }
    else {
      this.router.navigate(["/"])
      this.toastrService.error("Ödeme sayfasına yönlendirilemiyorsunuz","Bir sorun oluştu");
        return false;
    }
  }
  
}
