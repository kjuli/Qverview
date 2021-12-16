import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repository-dialog',
  templateUrl: './repository-dialog.component.html',
  styleUrls: ['./repository-dialog.component.scss']
})
export class RepositoryDialogComponent implements OnInit {

  repositoryUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
