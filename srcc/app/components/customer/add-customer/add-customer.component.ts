import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Address from '../../../shared/models/address.model';
import Customer from '../../../shared/models/customer.model';
import CustomerHasAddress from '../../../shared/models/customer_has_address.model';
import Settings from '../../../shared/models/settings.model';
import User from '../../../shared/models/user.model';
import { AddressService } from '../../../shared/services/address.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerHasAddressService } from '../../../shared/services/customer_has_address.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    forCompany: boolean;
    customer: Customer = new Customer;
    address: Address = new Address;

    addressExists = false;
    hasAddressExists = false;

    constructor(private titleService: Title, private customerService: CustomerService, private customerHasAddressService: CustomerHasAddressService,
        private addressService: AddressService, private userService: UserService, private router: Router,
        private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.titleService.setTitle('Create Customer - ' + this.settings.company_name);
        this.forCompany = false;
    }

    changeForm(event: any) {
        if (event.target.checked) {
            this.forCompany = true;
        } else {
            this.forCompany = false;
        }
    }

    submitForm() {
        // Show spinner
        this.spinner.show();

        this.customerService.create(this.customer).subscribe(
            (response) => {
                if (this.customer.address == null) {
                    this.checkAddressExists();
                } else {
                    setTimeout(() => {
                        // Hide spinner
                        this.spinner.hide();

                        this.router.navigate(['/customers']);
                    }, 1500);
                }
            },
            (error) => { throw error; }
        );
    }

    private checkAddressExists() {
        this.addressService.addressExists(this.address.postal_code, this.address.number).subscribe(
            (response) => {
                this.addressExists = response;
                this.createAddress();
            },
            (error) => { throw error; }
        );
    }

    private createAddress() {
        if (this.addressExists) {
            this.checkHasAddressExists();
        } else {
            this.addressService.create(this.address).subscribe(
                (res) => this.checkHasAddressExists(),
                (error) => { throw error; }
            );
        }
    }

    private checkHasAddressExists() {
        this.customerHasAddressService.hasAddressExists(this.customer.id).subscribe(
            (response) => {
                this.hasAddressExists = response;
                this.createHasAddress();
            },
            (error) => { throw error; }
        );
    }

    private createHasAddress() {
        if (this.hasAddressExists) {
            this.deleteHasAddress();
        } else {
            const customerAddressLink = new CustomerHasAddress();
            customerAddressLink.customer_id = this.customer.id;
            customerAddressLink.address_postal = this.address.postal_code;
            customerAddressLink.address_number = this.address.number;

            this.customerHasAddressService.create(customerAddressLink).subscribe(
                (response) => this.createUser(),
                (error) => { throw error; }
            );
        }
    }

    private deleteHasAddress() {
        this.customerHasAddressService.deleteCustomerHasAddress(this.customer.id, this.address.postal_code, this.address.number).subscribe(
            (response) => { this.createHasAddress(); },
            (error) => { throw error; }
        );
    }

    private createUser() {
        const user = new User();
        user.email = this.customer.email;
        user.role_id = 2;

        if (this.customer.company_name == null) {
            user.first_name = this.customer.first_name;
            user.last_name = this.customer.last_name;
        } else {
            user.company_name = this.customer.company_name;
        }

        this.userService.create(user).subscribe(
            (response) => {
                setTimeout(() => {
                    // Hide spinner
                    this.spinner.hide();

                    this.router.navigate(['/customers']);
                }, 1500);
            },
            (error) => { throw error; }
        );
    }
}
