import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

export type BreadcrumbItem = {
  title: string;
  route?: string;
}

@Component({
  selector: 'app-admin-breadcrumb',
  imports: [
    NgIf,
    RouterLink,
    NgForOf,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input({ required: true }) title!: string
  @Input() navItems: BreadcrumbItem[] = []
  @Input() link?: string
}
