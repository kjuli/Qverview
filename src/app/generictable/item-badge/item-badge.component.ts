import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-badge',
  templateUrl: './item-badge.component.html',
  styleUrls: ['./item-badge.component.scss']
})
export class ItemBadgeComponent implements OnInit {

  @Input() color: string;
  @Input() value: string;
  @Input() isUndefined = false;

  constructor() { }

  ngOnInit(): void {
  }

  public customColor(): object {
    return {background: (this.color || '#6EB7FF')};
  }

  public getStyleClass(): string {
    let result = 'reference';

    if (!this.isUndefined) {
      result += ' cell';
    } else {
      result += ' undefinedCell';
    }

    return result;
  }
}
