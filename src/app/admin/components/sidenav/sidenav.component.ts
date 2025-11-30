import {Component, Input} from '@angular/core';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav} from "@angular/material/sidenav";
import {RouterLink} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-admin-sidenav',
    imports: [
        MatListItem,
        MatIconModule,
        RouterLink
    ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
}
