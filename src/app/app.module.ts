import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { UnauthorizedUserComponent } from "./unauthorized-user/unauthorized-user.component";
import { AuthGuardGuard } from "./auth-guard.guard";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, HomePageComponent, UnauthorizedUserComponent],
  exports: [],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
