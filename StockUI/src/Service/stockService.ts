//npm i ngx-socket-io
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Stock } from 'src/Model/stock';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Socket } from 'ngx-socket-io';
@Injectable({ providedIn: 'root' })
export class StockService {
    baseUrl: string = "http://localhost:9480/getstockData";
    updateUrl: string = "http://localhost:9480/updatestockData";

    constructor(private httpClient: HttpClient, private socket: Socket) { }

    //SocketIO
    updatedStock = this.socket.fromEvent<Stock>('updatedStock');

    public getStocks(): Observable<Array<Stock>> {
        return this.httpClient.get<Array<Stock>>(this.baseUrl)
            .pipe(
                retry(1),
                catchError(this.errorHandel)
            )
    }

    errorHandel(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}