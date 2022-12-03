import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ngx-currency-mask';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ngx-currency-mask/src/currency-mask.config';
import { ToastyModule } from 'ngx-toasty';

import { CustomErrorHandler } from '../../shared/error-handler';
import { AddressService } from '../../shared/services/address.service';
import { CustomerService } from '../../shared/services/customer.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { InvoiceItemService } from '../../shared/services/invoice_item.service';
import { CustomerDropdownModule } from '../customer/customer-dropdown/customer-dropdown.module';
import { ModalModule } from '../modal/modal.module';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { DetailInvoiceComponent } from './detail-invoice/detail-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice.routing';
import { NgxSpinnerModule } from 'ngx-spinner';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: '',
    suffix: '',
    thousands: '.'
};

@NgModule({
    declarations: [
        InvoiceComponent,
        CreateInvoiceComponent,
        DetailInvoiceComponent,
        EditInvoiceComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        CustomerDropdownModule,
        CurrencyMaskModule,
        ModalModule,
        NgxSpinnerModule,
        ToastyModule.forRoot(),
        InvoiceRoutingModule
    ],
    providers: [
        InvoiceService,
        InvoiceItemService,
        CustomerService,
        AddressService,
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
    exports: [
        InvoiceComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class InvoiceModule { }
