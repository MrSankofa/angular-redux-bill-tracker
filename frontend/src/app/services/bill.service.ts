import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../model';


@Injectable({ providedIn: 'root' })
export class BillService {
  // private apiUrl = 'http://localhost:3000/api/bills';
  private apiUrl = 'https://apibills.ue.r.appspot.com/api/bills';

  constructor(private http: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiUrl);
  }
}
