import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import Customer from '../models/customer.model';
import { PaginationResult } from '../models/pagination.result';

@Injectable()
export class CustomerService {
    private apiUrl = environment.apiBase + '/customers/';

    constructor(public http: HttpClient) { }

    getByEmail(email: string): Observable<Customer> {
        return this.http.get<Customer>(this.apiUrl + 'getByEmail?email=' + email)
            .pipe(catchError(error => throwError(error)));
    }

    getById(id: string): Observable<Customer> {
        return this.http.get<Customer>(this.apiUrl + 'getById?id=' + id)
            .pipe(catchError(error => throwError(error)));
    }

    getAll(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.apiUrl + 'getAll')
            .pipe(catchError(error => throwError(error)));
    }

    index(page: number, pageSize: number = 10): Observable<PaginationResult<Customer>> {
        return this.http.get<PaginationResult<Customer>>(this.apiUrl + 'index?page=' + page + '&pageSize=' + pageSize)
            .pipe(catchError(error => throwError(error)));
    }

    create(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.apiUrl + 'create', customer)
            .pipe(catchError(error => throwError(error)));
    }

    update(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(this.apiUrl + 'update', customer)
            .pipe(catchError(error => throwError(error)));
    }

    delete(id: string): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + 'delete?id=' + id)
            .pipe(catchError(error => throwError(error)));
    }
}
