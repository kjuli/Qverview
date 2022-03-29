import { Component, OnInit } from '@angular/core';
import {FilterService} from '../filter/filter.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public sidebarOpened = false;

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterService.search(filterValue);
  }
}
