import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastyModule } from 'ngx-toasty';
import { CustomErrorHandler } from '../../shared/error-handler';
import { AddressService } from '../../shared/services/address.service';
import { CustomerService } from '../../shared/services/customer.service';
import { CustomerHasAddressService } from '../../shared/services/customer_has_address.service';
import { ModalModule } from '../modal/modal.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer.routing';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ImportCustomerComponent } from './import-customer/import-customer.component';


@NgModule({
    declarations: [
        CustomerComponent,
        AddCustomerComponent,
        DetailCustomerComponent,
        EditCustomerComponent,
        ImportCustomerComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ModalModule,
        NgxSpinnerModule,
        ToastyModule.forRoot(),
        CustomerRoutingModule
    ],
    providers: [
        CustomerService,
        AddressService,
        CustomerHasAddressService,
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ],
    exports: [
        CustomerComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class CustomerModule { }
