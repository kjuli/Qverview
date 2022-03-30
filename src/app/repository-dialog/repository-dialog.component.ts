import { Component, OnInit } from '@angular/core';
import {RepositoryService} from '../repository/repository.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-repository-dialog',
  templateUrl: './repository-dialog.component.html',
  styleUrls: ['./repository-dialog.component.scss']
})
export class RepositoryDialogComponent implements OnInit {

  repositoryUrl: string;

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
  }

  reloadApi(): void {
    console.log('reloading!! to ' + this.repositoryUrl);
    this.repositoryService.getAllData(this.repositoryUrl);
  }
}
