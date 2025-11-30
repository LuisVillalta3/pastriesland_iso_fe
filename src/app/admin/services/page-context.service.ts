import { Injectable } from '@angular/core';
import {BreadcrumbItem} from '@/app/admin/components/breadcrumb/breadcrumb.component';
import {BehaviorSubject} from 'rxjs';

export interface HeaderProps {
  title: string;
  routes: BreadcrumbItem[]
}

@Injectable({
  providedIn: 'root'
})
export class PageContextService {
  private titleSubject = new BehaviorSubject<string>('');
  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);

  private creationLinkSubject = new BehaviorSubject<string>('');

  title$ = this.titleSubject.asObservable()
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  creationLink$ = this.creationLinkSubject.asObservable()

  setTitle(title: string) {
    this.titleSubject.next(title)
  }

  setBreadcrumbs(breadcrumbs: BreadcrumbItem[]) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }

  setCreationLink(link: string) {
    this.creationLinkSubject.next(link)
  }
}
