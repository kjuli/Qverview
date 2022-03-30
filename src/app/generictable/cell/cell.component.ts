import {Component, Input, OnInit} from '@angular/core';
import {Entity} from '../../common/repository';
import {FilterService} from '../../filter/filter.service';
import {MatDialog} from '@angular/material/dialog';
import {DetailedViewComponent} from '../detailed-view/detailed-view.component';
import {TableModel} from '../table.model';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() value: any;
  @Input() isID: boolean = false;
  @Input() color?: string;
  @Input() filterValue: string;
  @Input() parent: Entity;
  @Input() table?: TableModel<any>;
  @Input() filterOrDialog: 'filter' | 'dialog' = 'filter';

  colored: boolean = !this.isID;

  constructor(private filterService: FilterService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.parent && this.parent.link) {
      console.log('Has link! ' + this.parent.link);
    }
  }

  public isArray(value: any): boolean {
    return Array.isArray(value);
}

  public isReference(value: any = this.value): value is Entity {
    return value instanceof Entity;
  }

  public filterToReference(value: Entity): void {
    if (this.filterValue) {
      this.filterService.updateSelectionField(this.filterValue, value);
    }
  }

  public getStyleClass(value: any): string {
    if (!this.colored) {
      return '';
    }

    let result = '';
    if (this.isReference(value)) {
      result += 'reference';
      if (!value.isUndefined) {
        result += ' cell';
      } else {
        result += ' undefinedCell';
      }
    } else {
      result += 'cell';
    }
    return result;
  }

  public isPrimitive(value: any): boolean {
    return value in ['true', 'false'];
  }

  public customColor(): object {
    if (!this.colored || this.isPrimitive(this.value) || this.isReference(this.value) && this.value.isUndefined) {
      return {};
    } else {
      return {background: (this.color || '#6EB7FF')};
    }
  }

  public openEntityDialog(value: Entity = this.parent, table: TableModel<any> = this.table): void {
    if (value) {
      const dialogRef = this.dialog.open(DetailedViewComponent, {
        data: {
          entity: value,
          table
        },
        autoFocus: false,
        maxHeight: '90vh'
      });

      // dialogRef.afterClosed().subscribe(result => {
      // });
    }
  }

  public onClick(value: Entity): void {
    if (this.filterOrDialog === 'filter') {
      this.filterToReference(value);
    } else {
      this.openEntityDialog(value, value.tableModel);
    }
  }
}
