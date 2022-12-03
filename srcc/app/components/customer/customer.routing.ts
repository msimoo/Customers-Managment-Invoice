import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/authguard.service';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerComponent } from './customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ImportCustomerComponent } from './import-customer/import-customer.component';

const routes: Routes = [
    {
        path: 'customers',
        children: [
            {
                path: '',
                component: CustomerComponent,
                pathMatch: 'full',
                canActivate: [AuthGuard],
                data: { title: 'Customers', roles: [1] }
            },
            {
                path: 'add',
                component: AddCustomerComponent,
                pathMatch: 'full',
                canActivate: [AuthGuard],
                data: { title: 'Add Customer', roles: [1] }
            },
            {
                path: 'details/:id',
                component: DetailCustomerComponent,
                pathMatch: 'full',
                canActivate: [AuthGuard],
                data: { title: 'Customer Details', roles: [1, 2] }
            },
            {
                path: 'edit/:id',
                component: EditCustomerComponent,
                pathMatch: 'full',
                canActivate: [AuthGuard],
                data: { title: 'Edit Customer', roles: [1, 2] }
            },
            {
                path: 'import',
                component: ImportCustomerComponent,
                pathMatch: 'full',
                canActivate: [AuthGuard],
                data: { title: 'Import Customers', roles: [1] }
            }
        ]
    },
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

export class CustomerRoutingModule { }
