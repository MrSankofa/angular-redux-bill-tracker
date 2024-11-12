import { createAction, props } from '@ngrx/store';
import { Bill } from '../model';


export const loadBills = createAction('[Bill] Load Bills');
export const loadBillsSuccess = createAction('[Bill] Load Bills Success', props<{ bills: Bill[] }>());
export const addBill = createAction('[Bill] Add Bill', props<{ bill: Bill }>());
export const updateBill = createAction('[Bill] Update Bill', props<{ bill: Bill }>());
export const deleteBill = createAction('[Bill] Delete Bill', props<{ id: number }>());
