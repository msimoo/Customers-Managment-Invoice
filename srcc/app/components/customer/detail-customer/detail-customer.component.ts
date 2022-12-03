import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Customer from '../../../shared/models/customer.model';
import Settings from '../../../shared/models/settings.model';
import { CustomerService } from '../../../shared/services/customer.service';

@Component({
    selector: 'app-detail-customer',
    templateUrl: './detail-customer.component.html',
    styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    customerId: string;
    customer: Customer;

    streetWithNumber: string;

    constructor(private titleService: Title, private route: ActivatedRoute, private customerService: CustomerService,
        private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Customer Details - ' + this.settings.company_name);
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
                this.streetWithNumber = this.customer.address.street + ' ' + this.customer.address.number;
            },
            (error) => { throw (error); }
        );
    }
}
