import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CookiesService} from '@/app/services/cookies.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    private cookieService: CookiesService,
    private router: Router,
  ) {}

  onToggleClick() {
    this.toggleSidenav.emit();
  }

  signOut() {
    this.cookieService.deleteToken('admin')
    setTimeout(async () => {
      await this.router.navigate(['admin/login'])
    })
  }
}
