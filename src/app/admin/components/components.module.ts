import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NoDataComponent } from "./no-data/no-data.component";
@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NoDataComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NoDataComponent,
  ],
})
export class ComponentsModule {}
