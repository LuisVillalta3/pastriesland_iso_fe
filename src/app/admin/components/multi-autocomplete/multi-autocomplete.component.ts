import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, Observable, startWith} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {CommonModule, NgForOf} from '@angular/common';

export type InputOption = {
  key: string;
  value: string;
}

@Component({
  selector: 'app-multi-autocomplete',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, NgForOf, ReactiveFormsModule, CommonModule],
  templateUrl: './multi-autocomplete.component.html',
  styleUrl: './multi-autocomplete.component.scss'
})
export class MultiAutocompleteComponent {
  @Input() options: InputOption[] = []

  @Input() label!: string;
  @Output() selectedKeysChange = new EventEmitter<string[]>()

  @Input()
  set selectedOptions(value: string[]) {
    this._selectedOptions = value
    this.updateSelectedOptions()
  }
  get selectedOptions() {
    return this._selectedOptions;
  }
  private _selectedOptions: string[] = []

  updateSelectedOptions() {
    if (!this.options.length && !this.selectedOptions.length) return

    this.selectedKeys = [...this.selectedOptions]
    this.floatLabel = 'always'
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];

  floatLabel: 'auto' | 'always' = 'auto'

  inputControl = new FormControl('');
  selectedKeys: string[] = [];

  filteredOptions: Observable<InputOption[]> = this.inputControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || ''))
  );

  add(event: any): void {
    const inputValue = (event.value || '').trim().toLowerCase();
    const match = this.options.find(opt =>
      opt.value.toLowerCase() === inputValue
    );
    if (match && !this.selectedKeys.includes(match.key)) {
      this.selectedKeys.push(match.key);
      this.selectedKeysChange.emit(this.selectedKeys);
    }
    event.chipInput!.clear();
    this.inputControl.setValue('');
  }

  remove(key: string): void {
    this.selectedKeys = this.selectedKeys.filter(k => k !== key);
    this.selectedKeysChange.emit(this.selectedKeys);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (!this.selectedKeys.includes(value)) {
      this.selectedKeys.push(value);
      this.selectedKeysChange.emit(this.selectedKeys);
    }
    this.inputControl.setValue('');
  }

  getSelectedValue(key: string): string {
    return this.options.find(opt => opt.key === key)?.value || key;
  }

  private _filter(value: string): InputOption[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      opt =>
        opt.value.toLowerCase().includes(filterValue) &&
        !this.selectedKeys.includes(opt.key)
    );
  }
}
