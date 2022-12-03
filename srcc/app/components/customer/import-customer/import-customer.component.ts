import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastOptions, ToastyService } from 'ngx-toasty';
import Address from '../../../shared/models/address.model';
import Customer from '../../../shared/models/customer.model';
import CustomerHasAddress from '../../../shared/models/customer_has_address.model';
import Settings from '../../../shared/models/settings.model';
import { AddressService } from '../../../shared/services/address.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerHasAddressService } from '../../../shared/services/customer_has_address.service';


@Component({
    selector: 'app-import-customer',
    templateUrl: './import-customer.component.html',
    styleUrls: ['./import-customer.component.scss']
})
export class ImportCustomerComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));
    @ViewChild('fileInput') fileInput: ElementRef;

    customers: Customer[] = [];
    addresses: Address[] = [];
    livesAts: CustomerHasAddress[] = [];
    toastOptions: ToastOptions;
    fileLabel = 'Choose a CSV file to upload';

    constructor(private titleService: Title, private customerService: CustomerService, private addressService: AddressService,
        private customerHasAddressService: CustomerHasAddressService, private toastyService: ToastyService,
        private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) {

        this.titleService.setTitle('Import Customers - ' + this.settings.company_name);
        this.toastOptions = {
            title: 'Success',
            msg: 'Customer(s) have been successfully added!',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000
        };
    }

    ngOnInit() { }

    upload(event: any) {
        this.extractData(event.target);
    }

    setFileName() {
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];

            if (fileToUpload) {
                this.fileLabel = fileToUpload.name;
            }
        } else {
            this.fileLabel = 'Choose a CSV file to upload';
        }
    }

    private mapToCustomer(data: any[]) {
        const customer = new Customer();
        customer.id = data[0];
        customer.first_name = data[1];
        customer.last_name = data[2];
        customer.email = data[3];
        customer.phone = data[4];
        customer.bank_account = data[5];

        const address = new Address();
        address.street = data[6];
        address.number = Number.parseInt(data[7]);
        address.suffix = data[8];
        address.postal_code = data[9];
        address.city = data[10];
        address.country = data[11];

        const livesAt = new CustomerHasAddress();
        livesAt.customer_id = customer.id;
        livesAt.address_postal = address.postal_code;
        livesAt.address_number = address.number;

        this.customers.push(customer);
        this.addresses.push(address);
        this.livesAts.push(livesAt);
    }

    private extractData(fileInput: any) {
        // Show spinner
        this.spinner.show();

        const fi = this.fileInput.nativeElement;
        const lines = [];

        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];

            const reader: FileReader = new FileReader();
            reader.readAsText(fileToUpload);

            reader.onload = (e) => {
                const csv = reader.result;
                const allTextLines = csv.toString().split(/\r|\n|\r/);
                const headers = allTextLines[0].split(',');

                for (let i = 1; i < allTextLines.length; i++) {
                    // split content based on comma
                    const data = allTextLines[i].split(',');
                    if (data.length === headers.length) {
                        const tarr = [];
                        for (let j = 0; j < headers.length; j++) {
                            tarr.push(data[j]);
                        }

                        this.mapToCustomer(tarr);
                    }
                }

                this.saveCustomers();
            };
        }
    }

    private saveCustomers() {
        let count = 0;
        for (let i = 0; i < this.customers.length; i++) {
            const customer = this.customers[i];

            this.customerService.create(customer).subscribe(
                (res) => {
                    count++;
                    if (count === this.customers.length) {
                        this.toastyService.success(this.toastOptions);
                    }
                },
                (error) => { throw error; }
            );
        }

        this.createAddresses();
    }

    private createAddresses() {
        for (let i = 0; i < this.addresses.length; i++) {
            const address = this.addresses[i];
            this.addressService.create(address).subscribe(
                res => this.linkAddress(),
                (error) => { throw error; }
            );
        }

        setTimeout(() => {
            // Hide spinner
            this.spinner.hide();

            this.router.navigate(['/customers']);
        }, 3000);
    }

    private linkAddress() {
        for (let i = 0; i < this.livesAts.length; i++) {
            const livesAt = this.livesAts[i];
            this.customerHasAddressService.create(livesAt).subscribe(
                res => { },
                (error) => { throw error; }
            );
        }
    }
}
