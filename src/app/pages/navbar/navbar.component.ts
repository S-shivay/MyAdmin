import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() toggleSidebarEvent = new  EventEmitter<void>();
  authService = inject(AuthService);

  toggleSidebar(){
    this.toggleSidebarEvent.emit();
  }

  onLogout(): void{
    this.authService.logout();
  }
}
