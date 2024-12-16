import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bill } from '../model';
import { addBill, loadBills, updateBill, deleteBill } from '../actions';
import { AppState } from '../state/app.state';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills$: Observable<Bill[]>;
  billForm: FormGroup;
  editingBill: Bill | null = null;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.bills$ = this.store.select(state => state.bills);
    this.billForm = this.fb.group({
      name: ['', Validators.required],
      dueDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      bankAccount: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadBills());
  }

  onSubmit(): void {
    const billData: Bill = this.billForm.value;

    if (this.editingBill) {
      // Update existing bill
      const updatedBill = { ...this.editingBill, ...billData };
      this.store.dispatch(updateBill({ bill: updatedBill }));
    } else {
      // Add new bill
      this.store.dispatch(addBill({ bill: billData }));
    }

    this.resetForm();
  }

  editBill(bill: Bill): void {
    this.editingBill = bill;
    this.billForm.patchValue(bill);
  }

  deleteBill(id: number): void {
    this.store.dispatch(deleteBill({ id }));
  }

  resetForm(): void {
    this.billForm.reset();
    this.editingBill = null;
  }
}
