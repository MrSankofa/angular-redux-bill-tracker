import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { loadBills, loadBillsSuccess } from '../actions';
import { BillService } from '../services/bill.service';

@Injectable()
export class BillEffects {
  loadBills$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBills),
      mergeMap(() => this.billService.getBills().pipe(map(bills => loadBillsSuccess({ bills }))))
    )
  );

  constructor(private actions$: Actions, private billService: BillService) {}
}
