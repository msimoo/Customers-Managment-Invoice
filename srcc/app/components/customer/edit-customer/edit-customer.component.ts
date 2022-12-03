import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Address from '../../../shared/models/address.model';
import Customer from '../../../shared/models/customer.model';
import CustomerHasAddress from '../../../shared/models/customer_has_address.model';
import Settings from '../../../shared/models/settings.model';
import { AddressService } from '../../../shared/services/address.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerHasAddressService } from '../../../shared/services/customer_has_address.service';

@Component({
    selector: 'app-edit-customer',
    templateUrl: './edit-customer.component.html',
    styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    customerId: string;
    customer: Customer;
    lives_at: CustomerHasAddress;
    address: Address;

    constructor(private titleService: Title, private route: ActivatedRoute, private customerService: CustomerService,
        private customerHasAddressService: CustomerHasAddressService, private addressService: AddressService, private router: Router,
        private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.titleService.setTitle('Edit Customer - ' + this.settings.company_name);
        this.route.params.subscribe(
            (params) => {
                this.customerId = params['id'];
                this.getCustomer(this.customerId);
            }
        );
    }

    getCustomer(id: string) {
        this.customerService.getById(id).subscribe(
            (response) => {
                this.customer = response;
                this.getLivesAt();
            },
            (error) => { throw error; }
        );
    }

    getAddress() {
        this.addressService.getAddress(this.lives_at.address_postal, this.lives_at.address_number).subscribe(
            (response) => this.address = response,
            (error) => { throw error; }
        );
    }

    getLivesAt() {
        this.customerHasAddressService.getByCustomerId(this.customer.id).subscribe(
            (response) => {
                this.lives_at = response;
                this.getAddress();
            },
            (error) => { throw error; }
        );
    }

    submitForm() {
        // Show spinner
        this.spinner.show();

        this.customerService.update(this.customer).subscribe(
            (response) => {
                if ((this.customer.address.postal_code !== this.address.postal_code)
                    && (this.customer.address.number !== this.address.number)) {
                    this.createAddress();
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

    createAddress() {
        const exists = this.addressService.getAddress(this.address.postal_code, this.address.number).subscribe(
            (response) => {
                if (response !== null) {
                    return true;
                } else {
                    return false;
                }
            },
            (error) => { }
        );

        if (exists) {
            this.linkAddress();
        } else {
            this.addressService.create(this.address).subscribe(
                (response) => this.linkAddress(),
                (error) => { throw error; }
            );
        }
    }

    private linkAddress() {
        const exists = this.customerHasAddressService.getByCustomerId(this.customer.id).subscribe(
            (response) => {
                if (response != null) {
                    return true;
                } else {
                    return false;
                }
            },
            (error) => { }
        );

        if (exists) {
            this.customerHasAddressService.deleteCustomerHasAddress(this.customer.id, this.address.postal_code, this.address.number).subscribe(
                (response) => { },
                (error) => { }
            );
        }

        const customerAddressLink = new CustomerHasAddress();
        customerAddressLink.customer_id = this.customer.id;
        customerAddressLink.address_postal = this.address.postal_code;
        customerAddressLink.address_number = this.address.number;

        this.customerHasAddressService.create(customerAddressLink).subscribe(
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
