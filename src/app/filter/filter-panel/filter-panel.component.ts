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

  @ViewChildren(MatSelect) selects: QueryList<MatSelect>;

  constructor(public filterService: FilterService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.filterService.registerListener(this.onChange);
  }

  selectionChange(event: MatSelectChange, field: string): void {
    this.filterService.updateSelectionField(field, event.value, 'form');
  }

  onChange = (selectionChange: SelectionChange) => {
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
      console.log('Selection: ' + s);

      item.value = s;
    });
  };

  clear(f: FilterField): void {
    const clearFunction = this.filterService.clear(f.field);
    clearFunction();
  }
}

export interface FilterField {
  label: string;
  field: string;
  clear?: () => void;
}
