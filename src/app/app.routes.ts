import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SuperadminComponent } from './pages/superadmin/superadmin.component';
import { HrComponent } from './pages/hr/hr.component';
import { CreatorComponent } from './pages/creator/creator.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'', component:HomeComponent,
        children:[
            {path:'dashboard', component:DashboardComponent, canActivate:[authGuard]},
            {path:'employee', component:EmployeeComponent, canActivate:[authGuard]},
            {path:'admin', component:AdminComponent, canActivate:[authGuard]},
            {path:'superadmin', component:SuperadminComponent, canActivate:[authGuard]},
            {path:'hr', component:HrComponent, canActivate:[authGuard]},
            {path:'creator', component:CreatorComponent, canActivate:[authGuard]}
        ]
    }
];
