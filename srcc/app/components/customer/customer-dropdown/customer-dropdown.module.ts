import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastyModule } from 'ngx-toasty';

import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerDropdownComponent } from './customer-dropdown.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgSelectModule,
        ToastyModule.forRoot()
    ],
    exports: [
        CustomerDropdownComponent
    ],
    declarations: [
        CustomerDropdownComponent
    ],
    providers: [
        CustomerService,
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ]
})
export class CustomerDropdownModule { }
