import { Routes } from '@angular/router';
import { DesktopComponent } from './components/desktop/desktop.component';
import { TicketSupportComponent } from './components/ticket-support/ticket-support.component';
import { LoginComponent } from './components/login/login.component';
import { LockScreenComponent } from './components/lock-screen/lock-screen.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', canActivate: [authGuard], component: DesktopComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'ticket-support', component: TicketSupportComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lock-screen', component: LockScreenComponent },
];
