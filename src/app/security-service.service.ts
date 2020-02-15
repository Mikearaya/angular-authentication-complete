import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppUserAuth } from "./auth.model";
import {
  AdminClaims,
  userClaims,
  UnAuthenticatedUser
} from "./user-type.model";
import { of, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SecurityServiceService {
  securityObject: AppUserAuth;

  constructor(private httpClient: HttpClient) {
    this.securityObject = userClaims;

    // localStorage.setItem("accountingBearerToken", JSON.stringify(this.x));

    if (localStorage.getItem("userClaims")) {
      this.securityObject = JSON.parse(localStorage.getItem("userClaims"));
    } else {
      localStorage.setItem("userClaims", JSON.stringify(this.securityObject));
    }
  }

  logIn(user: string = ""): Observable<AppUserAuth> {
    let currentUser;
    if (user.toUpperCase() == "ADMIN") {
      currentUser = AdminClaims;
    } else if (user.toUpperCase() == "USER") {
      currentUser = userClaims;
    } else {
      currentUser = JSON.parse(localStorage.getItem("userClaims"));
    }
    localStorage.setItem("userClaims", JSON.stringify(currentUser));
    this.securityObject = currentUser;
    console.log(this.securityObject);

    return of<AppUserAuth>(currentUser);
  }

  hasClaim(claimType: any, claimValue?: any): boolean {
    let ret = false;
    if (typeof claimType === "string") {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;

      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret = false;
    let auth: AppUserAuth = null;

    auth = this.securityObject;

    if (auth) {
      if (claimType.indexOf(":") >= 0) {
        const words: string[] = claimType.split(":");
        claimType = words[0].toLocaleLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLocaleLowerCase();
        claimValue = claimValue ? claimValue : "true";
      }

      const s = auth.claims.find(
        c =>
          c.claimType.toLocaleLowerCase() === claimType &&
          c.claimValue === claimValue
      );

      ret =
        auth.claims.find(
          c =>
            c.claimType.toLocaleLowerCase() === claimType &&
            c.claimValue === claimValue
        ) != null;
    }

    return ret;
  }
}
