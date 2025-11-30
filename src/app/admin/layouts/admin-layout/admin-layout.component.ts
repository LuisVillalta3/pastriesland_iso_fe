import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {ToolbarComponent} from '@/app/admin/components/toolbar/toolbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {SidenavComponent} from '@/app/admin/components/sidenav/sidenav.component';
import {BreadcrumbComponent, BreadcrumbItem} from '@/app/admin/components/breadcrumb/breadcrumb.component';
import {PageContextService} from '@/app/admin/services/page-context.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, ToolbarComponent, MatSidenavModule, MatListModule, RouterModule, SidenavComponent, BreadcrumbComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {
  constructor(private pageContext: PageContextService) {}

  title: string = ''
  breadcrumbsList: BreadcrumbItem[] = [];
  creationLink: string = ''

  isSidenavOpen = false

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageContext.title$.subscribe(t => this.title = t)
      this.pageContext.breadcrumbs$.subscribe(bc => this.breadcrumbsList = bc);
      this.pageContext.creationLink$.subscribe(l => this.creationLink = l)
    }, 0)
  }
}
