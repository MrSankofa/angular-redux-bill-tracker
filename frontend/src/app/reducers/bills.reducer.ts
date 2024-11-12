import { createReducer, on } from '@ngrx/store';
import { Bill } from '../model';
import { addBill, deleteBill, loadBillsSuccess, updateBill } from '../actions';


export const initialState: Bill[] = [];

export const billsReducer = createReducer(
  initialState,
  on(loadBillsSuccess, (_, { bills }) => bills),
  on(addBill, (state, { bill }) => [...state, bill]),
  on(updateBill, (state, { bill }) => state.map(b => (b.id === bill.id ? bill : b))),
  on(deleteBill, (state, { id }) => state.filter(b => b.id !== id))
);
