import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Entity} from '../../common/repository';
import {AppConfigService} from '../../config/app-config.service';
import {ReferencesService} from '../../references/references.service';
import {TableModel} from '../table.model';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss']
})
export class DetailedViewComponent implements OnInit, AfterViewInit {

  public entity: Entity;
  public tableDefinition?: TableModel<any>;
  public entityData: {[key: string]: any} = {};

  public references: {[key: string]: ReferenceObject } = {};

  constructor(
      public dialogRef: MatDialogRef<DetailedViewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private referenceService: ReferencesService
  ) {
    this.entity = this.data.entity;
    this.tableDefinition = this.data.table;
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    // for (const [key, value] of Object.entries(this.entity)) {
    //   if (typeof value !== 'function' && typeof value !== 'boolean' && key !== 'link' && key !== 'isUndefined' && key !== 'name' && key !== 'references') {
    //     this.entityData[key] = value;
    //   }
    // }
    for (const columnDef of this.tableDefinition.columns) {
      if (columnDef.name === 'name') {
        continue;
      }
      this.entityData[columnDef.name] = this.entity[columnDef.name];
    }
    console.log(this.entityData);
    let counter = 0;
    if (this.entity.references) {
      for (const [key, value] of Object.entries(this.entity.references)) {
        this.references[key] = value.map(ref => {
          counter++;
          return this.getReferenceValue(ref, counter);
        });
      }
    }
  }

  convertCamelCaseToSentence(input: string): string {
    const result = input.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  public getLabel(columnName: string): string {
    const column = this.tableDefinition.columns.find(column => column.name === columnName);
    if (column && column.label) {
      return column.label;
    }
    return this.convertCamelCaseToSentence(columnName);
  }

  private getReferenceValue(reference: string, counter: number): ReferenceObject {
    if (reference.startsWith('bib:')) {
      const bibId = reference.replace('bib:', '');
      const referenceObject: object = this.referenceService.references[bibId];
      return {
        type: 'bibliography',
        counter,
        bibliography: referenceObject
      };
    } else if (reference.startsWith('link:')) {
      const link = reference.replace('link:', '');
      return {link, counter, type: 'link'};
    }
    return null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getColor(key: string): string {
    if (AppConfigService.settings.colors[key]) {
      return AppConfigService.settings.colors[key];
    }
    return 'rgb(110,183,255)';
  }

  //only for testing
  stringify(something: ReferenceObject): string {
    if (something.type === 'link') {
      return `<a href="${something.link}">${something.link}</a>`;
    } else {
      return `Unsupported...`;
    }
  }

  isUndefined(value: any): boolean {
    return (value instanceof Entity) && value.isUndefined;
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}

export interface DialogData {
  entity: Entity;
  table?: TableModel<any>;
}

export interface ReferenceObject {
  type: 'link' | 'bibliography';
  bibliography?: object;
  link?: string;
  counter: number;
}
