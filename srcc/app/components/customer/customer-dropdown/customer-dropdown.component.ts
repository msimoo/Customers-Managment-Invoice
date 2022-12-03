import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Customer from '../../../shared/models/customer.model';
import { AddressService } from '../../../shared/services/address.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerHasAddressService } from '../../../shared/services/customer_has_address.service';

@Component({
    selector: 'app-customer-dropdown',
    templateUrl: './customer-dropdown.component.html',
    styleUrls: ['./customer-dropdown.component.scss']
})
export class CustomerDropdownComponent implements OnInit {
    customers: Customer[] = [];
    selectedCustomer: Customer;
    isReady = false;

    @Output() chosenCustomer = new EventEmitter<Customer>();

    constructor(private customerService: CustomerService, private customerHasAddressService: CustomerHasAddressService,
        private addressService: AddressService) { }

    ngOnInit() {
        this.getAllCustomers();
    }

    setCustomer(event: any) {
        this.selectedCustomer = <Customer>event;
        this.chosenCustomer.emit(this.selectedCustomer);
    }

    getAllCustomers() {
        this.customerService.getAll().subscribe(
            (response) => { this.customers = response; this.isReady = true; },
            (error) => { throw (error); }
        );
    }
}
