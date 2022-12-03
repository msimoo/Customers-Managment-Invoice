import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerComponent } from './components/customer/customer.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/user/login/login.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './shared/authguard.service';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            title: ' ',
            roles: [1, 2]
        }
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Users',
            roles: [1]
        }
    },
    {
        path: 'customer',
        component: CustomerComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Customer',
            roles: [1]
        }
    },
    {
        path: 'invoices',
        component: InvoiceComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Invoices',
            roles: [1, 2]
        }
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Invoices',
            roles: [1]
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Sign In'
        }
    },
    {
        path: 'forgot',
        component: ResetPasswordComponent,
        data: {
            title: 'Reset Password'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
