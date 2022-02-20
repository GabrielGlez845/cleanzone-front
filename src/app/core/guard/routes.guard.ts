import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let route_id = route.data["id"]+'';
      let rolId = localStorage.getItem('rolId');
      console.log(route_id,rolId)
      if (rolId === '1'){//administrador -> 1
        return true;
      }

      if (rolId === route_id){//Ensamblador -> 2
        return true;
      }

      if (rolId === route_id){//Mostrador -> 3
        return true;
      }

      if (rolId === route_id){//Chofer -> 4
        return true;
      }
    return false;
  }
  
}
