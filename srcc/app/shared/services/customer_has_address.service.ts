import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import CustomerHasAddress from '../models/customer_has_address.model';

@Injectable()
export class CustomerHasAddressService {
    private apiUrl = environment.apiBase + '/has_address/';

    constructor(public http: HttpClient) { }

    getByNumberAndPostalCode(postal: string, number: number): Observable<CustomerHasAddress> {
        return this.http.get<CustomerHasAddress>(this.apiUrl + 'read.php?number=' + number + '&postal=' + postal)
            .pipe(catchError(error => throwError(error)));
    }

    getByPostalCode(postal: string): Observable<CustomerHasAddress[]> {
        return this.http.get<CustomerHasAddress[]>(this.apiUrl + 'getByPostalCode?postal=' + postal)
            .pipe(catchError(error => throwError(error)));
    }

    getByCustomerId(id: string): Observable<CustomerHasAddress> {
        return this.http.get<CustomerHasAddress>(this.apiUrl + 'getByCustomerId?id=' + id)
            .pipe(catchError(error => throwError(error)));
    }

    hasAddressExists(id: string): Observable<boolean> {
        return this.http.get<boolean>(this.apiUrl + 'hasAddressExists?id=' + id)
            .pipe(catchError(error => throwError(error)));
    }

    getAll(): Observable<CustomerHasAddress[]> {
        return this.http.get<CustomerHasAddress[]>(this.apiUrl + 'getAll')
            .pipe(catchError(error => throwError(error)));
    }

    create(customerHasAddress: CustomerHasAddress): Observable<CustomerHasAddress> {
        return this.http.post<CustomerHasAddress>(this.apiUrl + 'create', customerHasAddress)
            .pipe(catchError(error => throwError(error)));
    }

    deleteCustomerHasAddress(id: string, postal: string, number: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?id=' + id + '&number=' + number + '&postal=' + postal)
            .pipe(catchError(error => throwError(error)));
    }
}
