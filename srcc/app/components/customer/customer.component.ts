import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Customer from '../../shared/models/customer.model';
import { PaginationResult } from '../../shared/models/pagination.result';
import Settings from '../../shared/models/settings.model';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    query = '';
    originalData: Customer[];
    pagedResult: PaginationResult<Customer>;
    isDesc = false;
    column: string;

    selectedRows: string[] = [];

    constructor(private titleService: Title, private customerService: CustomerService) { }

    ngOnInit() {
        this.titleService.setTitle('Customers - ' + this.settings.company_name);
        this.getPage(1);
    }

    search() {
        this.pagedResult.data = this.originalData;
        let results: Customer[] = [];

        if (this.pagedResult) {
            this.pagedResult.data.forEach(f => {
                if (f.company_name == null) {
                    if (f.id.toLowerCase().includes(this.query.toLowerCase()) || f.email.toLowerCase().includes(this.query.toLowerCase())
                        || f.address.city.toLowerCase().includes(this.query.toLowerCase())
                        || f.address.country.toLowerCase().includes(this.query.toLowerCase())
                        || f.first_name.toLowerCase().includes(this.query.toLowerCase())
                        || f.last_name.toLowerCase().includes(this.query.toLowerCase())) {

                        results.push(f);
                    }
                } else {
                    if (f.id.toLowerCase().includes(this.query.toLowerCase()) || f.email.toLowerCase().includes(this.query.toLowerCase())
                        || f.address.city.toLowerCase().includes(this.query.toLowerCase())
                        || f.address.country.toLowerCase().includes(this.query.toLowerCase())
                        || f.company_name.toLowerCase().includes(this.query.toLowerCase())) {

                        results.push(f);
                    }
                }
            });
        }

        this.pagedResult.data = results;
    }

    async getPage(page: number) {
        await this.customerService.index(page).toPromise().then(
            (response) => {
                this.pagedResult = response;
                this.originalData = response.data;
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    sort(property: string) {
        this.isDesc = !this.isDesc;
        this.column = property;
        const direction = this.isDesc ? 1 : -1;

        this.pagedResult.data.sort(function (a, b) {
            if (a[property] < b[property]) {
                return -1 * direction;
            } else if (a[property] > b[property]) {
                return 1 * direction;
            } else {
                return 0;
            }
        });
    }

    selectAll(event: any) {
        if (event.target.checked) {
            this.pagedResult.data.forEach(customer => {
                customer.selected = true;
                this.selectedRows.push(customer.id);
            });
        } else {
            this.pagedResult.data.forEach(customer => {
                customer.selected = false;
            });

            this.selectedRows.splice(0, this.selectedRows.length);
        }
    }

    selected(customer: Customer, event: any) {
        if (event.target.checked) {
            if (this.selectedRows.length === this.pagedResult.data.length - 1 && this.selectedRows.indexOf(customer.id) === -1) {
                let selectAllBox = <HTMLInputElement>document.querySelector('#selectAll');
                selectAllBox.checked = true;
            }

            customer.selected = true;
            this.selectedRows.push(customer.id);
        } else {
            if (this.selectedRows.length === 1 && this.selectedRows.indexOf(customer.id) !== -1) {
                let selectAllBox = <HTMLInputElement>document.querySelector('#selectAll');
                selectAllBox.checked = false;
            }

            customer.selected = false;
            this.selectedRows.splice(this.selectedRows.indexOf(customer.id), 1);
        }
    }

    deleteSelected(id?: string) {
        if (id) {
            if (confirm('Are you sure you want to delete this customer?')) {
                this.customerService.delete(id).subscribe(
                    () => this.ngOnInit(),
                    (error) => { throw error; }
                );
            }
        } else {
            if (this.selectedRows.length == 0) {
                confirm('Please select one or more customers.');
            } else {
                let confirmText = '';
                if (this.selectedRows.length === 1) {
                    confirmText = 'Are you sure you want to delete this customer?';
                } else if (this.selectedRows.length > 1) {
                    confirmText = 'Are you sure you want to delete these customers?';
                }

                if (confirm(confirmText)) {
                    this.selectedRows.forEach(row => {
                        this.customerService.delete(row).subscribe(
                            () => this.ngOnInit(),
                            (error) => { throw error; }
                        );
                    });
                }
            }
        }
    }
}
