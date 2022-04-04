import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FilterService} from '../filter.service';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {Selection, SelectionChange} from '../filter.model';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @Input() fields: FilterField[];
  andor: {[key: string]: 'and' | 'or'} = {};
  private currentValue: {[key: string]: any[]} = {};

  @ViewChildren(MatSelect) selects: QueryList<MatSelect>;

  constructor(public filterService: FilterService) { }

  ngOnInit(): void {
    this.fields.forEach(field => this.andor[field.field] = 'or');
  }

  ngAfterViewInit() {
    this.filterService.registerListener(this.onChange);
  }

  selectionChange(event: MatSelectChange, field: string): void {
    this.filterService.updateSelectionField(field, event.value, 'form', this.andor[field]);
  }

  onChange = (selectionChange: SelectionChange) => {
    this.currentValue = {};

    Object.keys(selectionChange.selection)
        .filter(key => this.fields.map(field => field.field).includes(key))
        .forEach(key => this.currentValue[key] = selectionChange.selection[key]);

    if (selectionChange.sourceOfChange === 'form') {
      return;
    }

    const selection = selectionChange.selection;
    this.selects.forEach(item => {
      const id = item.id;
      let s = selection[id];

      if (!Array.isArray(s)) {
        s = [s];
      }
      item.value = s;
    });
  };

  clear(f: FilterField): void {
    const clearFunction = this.filterService.clear(f.field);
    clearFunction();
  }

  changeLocalConnection(field: string): void {
    switch (this.andor[field]) {
      case 'and': this.andor[field] = 'or'; break;
      case 'or': this.andor[field] = 'and'; break;
    }
    if (this.currentValue) {
      this.filterService.updateSelectionField(field, this.currentValue[field], 'form', this.andor[field]);
    }
  }
}

export interface FilterField {
  label: string;
  field: string;
  clear?: () => void;
}
